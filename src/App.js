/**
 * Application
 */
import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from "./components/Header";
import Table from "./components/Table";
import Form from "./components/Form";
import ActionBlock from "./components/ActionBlock";

import store from "./redux/store";
import { actionSetDatabaseClient } from "./redux/actions/app";
import { actionFetch } from "./redux/actions/tasks";
import config from "./configs/main";
import theme from "./configs/theme";

const client = new ApolloClient({ uri: config.graphql_endpoint });
store.dispatch( actionSetDatabaseClient(client) );
store.dispatch( actionFetch() );

function App() {
  return (
        <ReduxProvider store={store}>
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <div align="center">
                       <Header/>
                       <Table/>
                       <ActionBlock/>
                       <Form/>
                    </div>
                </ThemeProvider>
            </ApolloProvider>
        </ReduxProvider>
  );
}

export default App;
