import React from "react";
import { createPortal } from "react-dom";
import "./App.css";

const App = () => {
  const data = [
    {
      id: 1,
      name: "Charlie",
      job: "Janitor",
      action: "CONFIRM",
    },
    {
      id: 2,
      name: "Mac",
      job: "Bouncer",
      action: "REJECT",
    },
    {
      id: 2,
      name: "John",
      job: "Bouncer",
      action: "ACCEPT",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");
  return (
    <div>
      <h1>React App Tutorial</h1>
      <Popup onClose={() => setOpen(false)} isOpen={open} title="Edit">
        {
          <form>
            <label>Name</label>
            <input type="text" value={content.name} />
            <label>Job</label>
            <input type="text" value={content.job} />
            <div className="popup_action">
              <button onClick={() => setOpen(false)}>Close</button>
              <button onClick={() => setOpen(false)}>{content.action}</button>
            </div>
          </form>
        }
      </Popup>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.job}</td>
                <td>
                  <button
                    onClick={() => {
                      setOpen(true);
                      setContent(item);
                    }}
                  >
                    {item.action}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;

// Create modal potral

const Popup = ({ children, onClose, isOpen,title }) => {
  const el = document.createElement("div");
  el.id = "modal";
  React.useEffect(() => {
    document.body.appendChild(el);
    return () => document.body.removeChild(el);
  }, [el]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <>
      <div className="popup">
        <div className="popup_inner">
          <div className="popup_header">
            <h1>{title}</h1>
            <button onClick={onClose}>X</button>
          </div>
          <div className="popup_content">{children}</div>
        </div>
      </div>
    </>,
    el
  );
};
