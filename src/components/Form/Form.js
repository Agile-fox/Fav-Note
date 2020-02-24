import React from "react";
import AppContext from '../../context';
import styles from "./Form.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Title from "../Title/Title";
import Radio from "./FormRadio";

const types = {
  twitter: 'twitter',
  article: 'article',
  note: 'note',
};

const descriptions = {
  twitter: 'Favorite Twitter account',
  article: 'Article',
  note: 'Note',
};

class Form extends React.Component {
  state = {
    type: types.twitter,
    title: " ",
    link: " ",
    image: " ",
    description: " ",
  };

handleRadioButtonChange = type => {
  this.setState ({
    type: type,
  });
};

handleInputChange = event => {
  this.setState({
    [event.target.name]: event.target.value,
  });
};



  render() {
    const { type } = this.state;

    return(
      <AppContext.Consumer>
        {context => (
          <div className={styles.wrapper}>
          <Title>{descriptions[type]}</Title>
          <form 
            className={styles.form} 
            onSubmit={(event) => context.addItem(event, this.state)}>
          <div>
            <Radio
              id={types.twitter}
              type="radio"
              checked={this.state.type === types.twitter}
              changeFn={() => this.handleRadioButtonChange(types.twitter)}
            >twitter
            </Radio>
            <Radio
              id={types.article}
              type="radio"
              checked={this.state.type === types.article}
              changeFn={() => this.handleRadioButtonChange(types.article)}
            >article
            </Radio>
            <Radio
              id={types.note}
              type="radio"
              checked={this.state.type === types.note}
              changeFn={() => this.handleRadioButtonChange(types.note)}
              value={this.state.title}
              onChange={(types.note)}
            >
            note</Radio>
          </div>
            <Input
              onChange={this.handleInputChange}
              value={this.state.title}
              name="title"
              label={type === types.twitter ? "Twitter Name" : "Title"}
              />
              {type !== types.note ? (
                <Input
                onChange={this.handleInputChange}
                value={this.state.link}
                name="link"
                label={
                  type === types.twitter ? "Twitter Link" : "Link"
                }
                />
                ) : null}
              { type === types.twitter ? (
                <Input
                onChange={this.handleInputChange}
                value={this.state.image} 
                name="image" 
                label="Image" 
                />
                ) : null}
            <Input
              onChange={this.handleInputChange}
              value={this.state.description}
              tag="textarea"
              name="description"
              label="Description"
              />
            <Button>add new item</Button>
        </form>
      </div>
        )}
     </AppContext.Consumer>
    );
  }
}


export default Form;
