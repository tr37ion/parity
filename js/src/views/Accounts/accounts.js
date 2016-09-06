import React, { Component, PropTypes } from 'react';
import { FlatButton } from 'material-ui';
import CommunicationContacts from 'material-ui/svg-icons/communication/contacts';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Summary from './Summary';
import { AddressBook, CreateAccount } from '../../modals';
import { Actionbar, Tooltip } from '../../ui';

import styles from './accounts.css';

export default class Accounts extends Component {
  static contextTypes = {
    api: PropTypes.object,
    accounts: PropTypes.array
  }

  state = {
    addressBook: false,
    newDialog: false
  }

  render () {
    return (
      <div>
        { this.renderAddressBook() }
        { this.renderNewDialog() }
        { this.renderActionbar() }
        <div className={ styles.accounts }>
          { this.renderAccounts() }
        </div>
      </div>
    );
  }

  renderActionbar () {
    const buttons = [
      <FlatButton
        key='newAccount'
        icon={ <ContentAdd /> }
        label='new account'
        primary
        onTouchTap={ this.onNewAccountClick } />,
      <FlatButton
        key='addressBook'
        icon={ <CommunicationContacts /> }
        label='address book'
        primary
        onTouchTap={ this.onAddressBookClick } />
    ];

    return (
      <Actionbar
        className={ styles.toolbar }
        title='Accounts Overview'
        buttons={ buttons }>
        <Tooltip
          className={ styles.toolbarTooltip }
          right
          text='actions relating to the current view are available on the toolbar for quick access, be it for performing actions or creating a new item' />
      </Actionbar>
    );
  }

  renderAccounts () {
    const { accounts } = this.context;

    if (!accounts) {
      return null;
    }

    const { tokens } = this.state;
    const firstTooltip = (
      <Tooltip
        className={ styles.accountTooltip }
        text='your accounts are visible for easy access, allowing you to edit the meta information, make transfers, view transactions and fund the account' />
    );

    return accounts
      .filter((acc) => acc.uuid)
      .map((account, idx) => {
        return (
          <div
            className={ styles.account }
            key={ account.address }>
            <Summary
              account={ account }
              tokens={ tokens }>
              { idx === 0 ? firstTooltip : null }
            </Summary>
          </div>
        );
      });
  }

  renderNewDialog () {
    const { newDialog } = this.state;

    if (!newDialog) {
      return null;
    }

    return (
      <CreateAccount
        onClose={ this.onNewAccountClose }
        onUpdate={ this.onNewAccountUpdate } />
    );
  }

  renderAddressBook () {
    const { addressBook } = this.state;

    if (!addressBook) {
      return null;
    }

    return (
      <AddressBook
        onClose={ this.onAddressBookClose } />
    );
  }

  onAddressBookClick = () => {
    this.setState({
      addressBook: !this.state.addressBook
    });
  }

  onNewAccountClick = () => {
    this.setState({
      newDialog: !this.state.newDialog
    });
  }

  onAddressBookClose = () => {
    this.onAddressBookClick();
  }

  onNewAccountClose = () => {
    this.onNewAccountClick();
  }

  onNewAccountUpdate = () => {
  }
}
