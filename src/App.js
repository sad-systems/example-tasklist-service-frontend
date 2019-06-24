import React from "react";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";

import Header from "./components/Header";
import Table from "./components/Table";
import Form from "./components/Form";

import "./App.css";
import config from "./configs/main";

const client = new ApolloClient({
    uri: config.graphql_endpoint,
});

function App() {

  const [ isAdmin, setIsAdmin ]   = React.useState(false);
  const [ token, setToken ]       = React.useState(false);
  const [ formData, setFormData ] = React.useState(false);

  const handleLogin = token => {
      setToken(token);
      setIsAdmin(!!token);
  };

  const handleEdit = task => {
      setFormData(task);
  };

  const handleNewTask = () => {
      setFormData({});
  };

  const handleSubmited = id => { console.log("WWWW");
      client.resetStore(); //<--- Clear GraphQL cache
  };

  return (
        <ApolloProvider client={client}>
            <div className="container" align="center">
               <Header isAdmin={isAdmin} onLogin={ handleLogin }/>
               <Table isAdmin={isAdmin} onEdit={ handleEdit }/>
               <div className="card-body" align="left">
                   <button className="btn btn-primary" onClick={ handleNewTask }>New task</button>
               </div>
               <Form isAdmin={isAdmin} token={token} task={formData} onSubmited={handleSubmited}/>
            </div>
        </ApolloProvider>
  );
}

export default App;
