import React , { Component } from 'react';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TwittersView from '../TwittersView/TwittersView';
import ArticlesView from '../ArticlesView/ArticlesView';
import NotesView from '../NotesView/NotesView';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';

import AppContext from '../../context';


class Root extends Component {
    state = {
        twitter: [],
        article: [],
        note: [],
        isModalOpen: false,
    };

    addItemHandler = (event, newItem) => {
        event.preventDefault();

        this.setState(prevState => ({
            [newItem.type]: [...prevState[newItem.type], newItem],
        }));


        this.closeModal();
    };

    openModal = () => {
        this.setState({
            isModalOpen: true,
        })
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false,
        })
    }

    render() {
        const { isModalOpen } = this.state;
        const contextElements = {
            ...this.state,
            addItem: this.addItemHandler
        }

        return (
            <BrowserRouter>
               <AppContext.Provider value={contextElements}>
                <Header openModalFn={this.openModal}/>
                <Switch>
                    <Route exact path="/" component={TwittersView} />
                    <Route path="/articles" component={ArticlesView} />
                    <Route path="/notes" component={NotesView} />
                </Switch>
                { isModalOpen && <Modal closeModalFn={this.closeModal} /> }
               </AppContext.Provider>
            </BrowserRouter>
        );
    }
}

export default Root;
