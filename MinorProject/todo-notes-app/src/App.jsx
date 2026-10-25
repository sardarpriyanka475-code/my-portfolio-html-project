

import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("tasks");
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  });
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes") || "[]");
  });

  const [task, setTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [filter, setFilter] = useState("All");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addTask(e) {
    e.preventDefault();

    if (task.trim() === "") return;

    if (editTaskId !== null) {
      setTasks(tasks.map(item =>
        item.id === editTaskId
          ? { ...item, text: task }
          : item
      ));
      setEditTaskId(null);
    } else {
      setTasks([...tasks, {
        id: Date.now(),
        text: task,
        completed: false
      }]);
    }

    setTask("");
  }

  function editTask(item) {
    setTask(item.text);
    setEditTaskId(item.id);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(item => item.id !== id));

    if (editTaskId === id) {
      setEditTaskId(null);
      setTask("");
    }
  }

  function toggleTask(id) {
    setTasks(tasks.map(item =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    ));
  }

  function addNote(e) {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") return;

    if (editNoteId !== null) {
      setNotes(notes.map(note =>
        note.id === editNoteId
          ? { ...note, title, description }
          : note
      ));
      setEditNoteId(null);
    } else {
      setNotes([...notes, {
        id: Date.now(),
        title,
        description
      }]);
    }

    setTitle("");
    setDescription("");
  }

  function editNote(note) {
    setTitle(note.title);
    setDescription(note.description);
    setEditNoteId(note.id);
  }

  function deleteNote(id) {
    setNotes(notes.filter(note => note.id !== id));

    if (editNoteId === id) {
      setEditNoteId(null);
      setTitle("");
      setDescription("");
    }
  }

  const filteredTasks = tasks.filter(item => {
    if (filter === "Completed") return item.completed;
    if (filter === "Pending") return !item.completed;
    return true;
  });

  const completed = tasks.filter(item => item.completed).length;

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">Taskly</h2>
        <p className="menu-title">MENU</p>

        <button
          className={page === "tasks" ? "menu active" : "menu"}
          onClick={() => setPage("tasks")}
        >
          ✓ My Tasks
        </button>

        <button
          className={page === "notes" ? "menu active" : "menu"}
          onClick={() => setPage("notes")}
        >
          ▤ My Notes
        </button>

        <div className="sidebar-bottom">
          <div className="avatar">S</div>
          <div>
            <strong>My Workspace</strong>
            <p>Personal project</p>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <p className="small-title">MY WORKSPACE</p>
            <h1>{page === "tasks" ? "My Tasks" : "My Notes"}</h1>
          </div>
          
        </header>

        {page === "tasks" ? (
          <>
            <section className="banner">
              <div>
                <p>STAY ORGANIZED</p>
                <h2>Make today count.</h2>
                <span>Plan your work and complete your goals.</span>
              </div>
              <div className="banner-icon">✓</div>
            </section>

            <section className="stats">
              <div className="stat-card">
                <p>Total Tasks</p>
                <h2>{tasks.length}</h2>
              </div>
              <div className="stat-card">
                <p>Completed</p>
                <h2>{completed}</h2>
              </div>
              <div className="stat-card">
                <p>Pending</p>
                <h2>{tasks.length - completed}</h2>
              </div>
            </section>

            <section className="card">
              <h2>{editTaskId !== null ? "Edit Task" : "Add New Task"}</h2>
              <form className="task-form" onSubmit={addTask}>
                <input
                  type="text"
                  placeholder="Enter your task..."
                  value={task}
                  onChange={e => setTask(e.target.value)}
                  required
                />
                <button className="primary-btn" type="submit">
                  {editTaskId !== null ? "Update Task" : "+ Add Task"}
                </button>

                {editTaskId !== null && (
                  <button
                    className="secondary-btn"
                    type="button"
                    onClick={() => {
                      setEditTaskId(null);
                      setTask("");
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </section>

            <section className="card">
              <div className="card-heading">
                <div>
                  <h2>My Task List</h2>
                  <p>Manage your daily activities.</p>
                </div>

                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
              </div>

              {filteredTasks.length === 0 ? (
                <div className="empty">
                  <div>✓</div>
                  <h3>No tasks found</h3>
                  <p>Add a new task to get started.</p>
                </div>
              ) : (
                filteredTasks.map(item => (
                  <div className="task-row" key={item.id}>
                    <button
                      className={item.completed ? "check checked" : "check"}
                      onClick={() => toggleTask(item.id)}
                      aria-label="Complete task"
                    >
                      {item.completed ? "✓" : ""}
                    </button>

                    <span className={item.completed ? "task-done" : "task-text"}>
                      {item.text}
                    </span>

                    <span className={item.completed ? "status done-status" : "status pending-status"}>
                      {item.completed ? "Completed" : "Pending"}
                    </span>

                    <button
                      className="edit-btn"
                      onClick={() => editTask(item)}
                      title="Edit"
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(item.id)}
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </section>
          </>
        ) : (
          <>
            <section className="banner">
              <div>
                <p>YOUR PERSONAL NOTEBOOK</p>
                <h2>Save your ideas.</h2>
                <span>Write down your thoughts and important notes.</span>
              </div>
              <div className="banner-icon">▤</div>
            </section>

            <section className="card">
              <h2>{editNoteId !== null ? "Edit Note" : "Create New Note"}</h2>

              <form className="note-form" onSubmit={addNote}>
                <input
                  type="text"
                  placeholder="Enter note title..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />

                <textarea
                  placeholder="Write your note here..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows="5"
                  required
                />

                <div className="form-buttons">
                  <button className="primary-btn" type="submit">
                    {editNoteId !== null ? "Update Note" : "+ Save Note"}
                  </button>

                  {editNoteId !== null && (
                    <button
                      className="secondary-btn"
                      type="button"
                      onClick={() => {
                        setEditNoteId(null);
                        setTitle("");
                        setDescription("");
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </section>

            <section className="notes-section">
              <div className="card-heading">
                <div>
                  <h2>My Notes</h2>
                  <p>{notes.length} saved notes</p>
                </div>
              </div>

              {notes.length === 0 ? (
                <div className="card empty">
                  <div>▤</div>
                  <h3>No notes yet</h3>
                  <p>Create your first note above.</p>
                </div>
              ) : (
                <div className="notes-grid">
                  {notes.map(note => (
                    <article className="note-card" key={note.id}>
                      <div className="note-icon">▤</div>
                      <h3>{note.title}</h3>
                      <p>{note.description}</p>

                      <div className="note-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => editNote(note)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteNote(note.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        
      
      </main>
    </div>
  );
}

export default App;
