import { useId } from "react";
import { LoginInfo } from "./Login";
import request, { gql } from "graphql-request";

const createEventMutation = gql`
  mutation CreateEvent(
    $beginsOn: DateTime!
    $endsOn: DateTime!
    $category: EventCategory!
    $title: String!
    $description: String!
    $organizer: ID!
    $location: String!
  ) {
    createEvent(
      beginsOn: $beginsOn
      endsOn: $endsOn
      category: $category
      title: $title
      description: $description
      organizerActorId: $organizer
      physicalAddress: { description: $location }
    ) {
      id
      url
    }
  }
`;

interface Props {
  loginInfo: LoginInfo;
}

const getDateTimeISO = (dateTimeLocal: string) => {
  const dateTime = new Date(`${dateTimeLocal}:00+0200`);
  return dateTime.toISOString();
};

export function CreateEvent({ loginInfo }: Props) {
  const titleId = useId();
  const descriptionId = useId();
  const locationId = useId();
  const startId = useId();
  const endId = useId();
  const categoryId = useId();

  return (
    <>
      <form
        onSubmit={async (ev) => {
          ev.preventDefault();
          const data = new FormData(ev.currentTarget);

          const response = await request(
            `https://${loginInfo.instanceDomain}/api`,
            createEventMutation,
            {
              beginsOn: getDateTimeISO(data.get("start") as string),
              endsOn: getDateTimeISO(data.get("end") as string),
              category: data.get("category"),
              title: data.get("title"),
              description: data.get("description"),
              location: data.get("location"),
              organizer: loginInfo.user.defaultActor.id,
            },
            {
              Authorization: `Bearer ${loginInfo.accessToken}`,
            }
          );
          console.log(response);
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
          <option value="MUSIC">Musik</option>
          <option value="ARTS">Kunst</option>
          <option value="MOVEMENTS_POLITICS">Politik</option>
        </select>

        <button>Veranstaltung anlegen</button>
      </form>
    </>
  );
}
