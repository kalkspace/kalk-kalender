import { useId } from "react";
import "./App.css";

function App() {
  const titleId = useId();
  const descriptionId = useId();
  const locationId = useId();
  const startId = useId();
  const endId = useId();
  const categoryId = useId();

  return (
    <>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          const data = new FormData(ev.currentTarget);
          console.log(Object.fromEntries(data.entries()));
        }}
      >
        <label htmlFor={titleId}>Titel</label>
        <input type="text" name="title" id={titleId} />

        <label htmlFor={descriptionId}>Beschreibung</label>
        <textarea name="description" id={descriptionId} rows={7} />

        <label htmlFor={locationId}>Ort</label>
        <input type="text" name="location" id={locationId} />

        <label>Start</label>
        <input type="datetime-local" name="start" id={startId} />

        <label>Ende</label>
        <input type="datetime-local" name="end" id={endId} />

        <label htmlFor={categoryId}>Kategorie</label>
        <select name="category" id={categoryId}>
          <option>Musik</option>
          <option>Kunst</option>
          <option>Politik</option>
        </select>

        <button>Veranstaltung anlegen</button>
      </form>
    </>
  );
}

export default App;
