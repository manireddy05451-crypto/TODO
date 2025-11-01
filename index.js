// Simple Todo interactions: add tasks and toggle checked state
document.addEventListener('DOMContentLoaded', () => {
	const input = document.getElementById('todo');
	const addBtn = document.getElementById('addBtn');
	const list = document.getElementById('list-con');
	// search removed — no element present

		// Helper: create an li element for a task with label + actions
		function createTask(text) {
			const li = document.createElement('li');
			li.classList.add('task');

			// create a clickable circle (check), then the label, then actions
			const check = document.createElement('button');
			check.className = 'check';
			check.setAttribute('aria-label', 'Mark task completed');
			check.type = 'button';
			check.textContent = '✓';

			const label = document.createElement('span');
			label.className = 'label';
			label.textContent = text;

			const actions = document.createElement('div');
			actions.className = 'actions';

			const del = document.createElement('button');
			del.className = 'btn-icon btn-delete';
			del.setAttribute('aria-label', 'Delete task');
			del.textContent = '✕';

			const edit = document.createElement('button');
			edit.className = 'btn-icon btn-edit';
			edit.setAttribute('aria-label', 'Edit task');
			edit.textContent = '✎';

			actions.appendChild(edit);
			actions.appendChild(del);
			li.appendChild(check);
			li.appendChild(label);
			li.appendChild(actions);
			return li;
		}

	// Add new task from input
	function addTaskFromInput() {
		const value = input.value.trim();
		if (!value) return;
		const li = createTask(value);
		list.appendChild(li);
		input.value = '';
		input.focus();

	// no search: nothing else to do after adding
	}

	// Event: add button
	addBtn.addEventListener('click', addTaskFromInput);

	// Event: Enter key in input
	input.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') addTaskFromInput();
	});

		// Normalize existing plain <li> elements (wrap text into .label + add delete button)
		function normalizeExistingTasks() {
			Array.from(list.children).forEach((node) => {
				if (node.tagName !== 'LI') return;
				const li = node;
				// already normalized if it has .label
				if (li.querySelector('.label')) return;
				const text = (li.textContent || '').trim();
				li.innerHTML = '';
				li.classList.add('task');
				// create check + label + actions for existing plain li
				const check = document.createElement('button');
				check.className = 'check';
				check.setAttribute('aria-label', 'Mark task completed');
				check.type = 'button';
				check.textContent = '✓';

				const label = document.createElement('span');
				label.className = 'label';
				label.textContent = text;
				const actions = document.createElement('div');
				actions.className = 'actions';
				const del = document.createElement('button');
				del.className = 'btn-icon btn-delete';
				del.setAttribute('aria-label', 'Delete task');
				del.textContent = '✕';

				const edit = document.createElement('button');
				edit.className = 'btn-icon btn-edit';
				edit.setAttribute('aria-label', 'Edit task');
				edit.textContent = '✎';

				actions.appendChild(edit);
				actions.appendChild(del);
				li.appendChild(check);
				li.appendChild(label);
				li.appendChild(actions);
			});
		}

		// run normalization on load so static tasks get delete buttons & proper classes
		normalizeExistingTasks();

	// Event delegation: toggle checked on li click
		list.addEventListener('click', (e) => {
			const delBtn = e.target.closest('.btn-delete');
			const checkBtn = e.target.closest('.check');
			const editBtn = e.target.closest('.btn-edit');
			const li = e.target.closest('li');
			if (!li || !list.contains(li)) return;

			// If delete button clicked -> remove task
			if (delBtn) {
				li.remove();
				return;
			}

			// If check circle clicked -> toggle checked state
			if (checkBtn) {
				li.classList.toggle('checked');
				return;
			}

			// If edit button clicked -> start inline editing
			if (editBtn) {
				startEdit(li);
				return;
			}

			// clicking elsewhere does nothing now (prevents accidental toggles)
		});

	// search feature removed — no filtering logic needed

	// Inline edit helper
	function startEdit(li) {
		if (!li) return;
		if (li.classList.contains('editing')) return;
		const label = li.querySelector('.label');
		if (!label) return;
		const orig = label.textContent;
		const inputEl = document.createElement('input');
		inputEl.type = 'text';
		inputEl.className = 'edit-input';
		inputEl.value = orig;
		li.classList.add('editing');

		// Replace label with input
		label.replaceWith(inputEl);
		inputEl.focus();
		inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);

		function finish(save) {
			const newVal = (inputEl.value || '').trim();
			const newLabel = document.createElement('span');
			newLabel.className = 'label';
			newLabel.textContent = (save && newVal) ? newVal : orig;
			inputEl.replaceWith(newLabel);
			li.classList.remove('editing');
		}

		inputEl.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				finish(true);
			} else if (e.key === 'Escape') {
				finish(false);
			}
		});

		// blur saves
		inputEl.addEventListener('blur', () => finish(true));
	}
});

// Register service worker to enable offline / PWA capabilities
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js')
			.then(reg => console.log('ServiceWorker registered', reg.scope))
			.catch(err => console.warn('ServiceWorker registration failed', err));
	});
}

