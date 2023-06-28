import request, { gql } from "graphql-request";
import { useId } from "react";

const query = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        id
        email
        defaultActor {
          id
        }
      }
    }
  }
`;

interface LoginResponseWrapped {
  login: LoginResponse;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    defaultActor: {
      id: string;
    };
  };
}

export interface LoginInfo extends LoginResponse {
  instanceDomain: string;
}

interface Props {
  onLogin: (info: LoginInfo) => unknown;
}

export function Login({ onLogin }: Props) {
  const instanceId = useId();
  const emailId = useId();
  const passwordId = useId();

  return (
    <form
      onSubmit={async (ev) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        const instanceDomain = data.get("instance");
        if (typeof instanceDomain !== "string") {
          throw new TypeError("Invalid type for instance form field.");
        }

        const { login } = await request<LoginResponseWrapped>(
          `https://${instanceDomain}/api`,
          query,
          {
            email: data.get("email"),
            password: data.get("password"),
          }
        );
        onLogin({
          ...login,
          instanceDomain,
        });
      }}
    >
      <label htmlFor={instanceId}>Instanz</label>
      <input
        type="text"
        name="instance"
        id={instanceId}
        defaultValue={"demo.mobilizon.org"}
        readOnly
      />

      <label htmlFor={emailId}>E-Mail</label>
      <input type="email" name="email" id={emailId} />

      <label htmlFor={passwordId}>Passwort</label>
      <input type="password" name="password" id={passwordId} />

      <button>Login</button>
    </form>
  );
}
