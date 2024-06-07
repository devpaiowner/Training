import { Fragment } from 'react/jsx-runtime'
import './App.css'
import { useQuery, gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const GET_DATA = gql`
query Users {
  Users {
      _id
      username
      email
      password
  }
}
`;

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

function App() {
  const { loading: queryLoading, error: queryError, data: queryData }:any = useQuery(GET_DATA);
  const [signup, { loading: mutationLoading, error: mutationError, data: mutationData }]:any = useMutation(SIGNUP_MUTATION);


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    signup({ variables: { username, email, password } });
  };

  return (
    <Fragment>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <button onClick={handleSignup} disabled={mutationLoading}>
        Signup
      </button>

    </Fragment>
  )
}


export default App
