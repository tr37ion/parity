// Copyright 2015, 2016 Ethcore (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentSend from 'material-ui/svg-icons/content/send';

import { EditMeta, Shapeshift, Transfer } from '../../modals';
import { Actionbar, Button, Page } from '../../ui';

import shapeshiftBtn from '../../images/shapeshift-btn.png';

import Header from './Header';
import Transactions from './Transactions';

import styles from './account.css';

class Account extends Component {
  static propTypes = {
    params: PropTypes.object,
    accounts: PropTypes.object,
    balances: PropTypes.object,
    isTest: PropTypes.bool
  }

  propName = null

  state = {
    editDialog: false,
    fundDialog: false,
    transferDialog: false
  }

  render () {
    const { accounts, balances, isTest } = this.props;
    const { address } = this.props.params;

    const account = (accounts || {})[address];
    const balance = (balances || {})[address];

    if (!account) {
      return null;
    }

    return (
      <div className={ styles.account }>
        { this.renderEditDialog() }
        { this.renderFundDialog() }
        { this.renderTransferDialog() }
        { this.renderActionbar() }
        <Page>
          <Header
            isTest={ isTest }
            account={ account }
            balance={ balance } />
          <Transactions
            accounts={ accounts }
            address={ address } />
        </Page>
      </div>
    );
  }

  renderActionbar () {
    const buttons = [
      <Button
        key='transferFunds'
        icon={ <ContentSend /> }
        label='transfer'
        onClick={ this.onTransferClick } />,
      <Button
        key='shapeshift'
        icon={ <img src={ shapeshiftBtn } className={ styles.btnicon } /> }
        label='shapeshift'
        onClick={ this.onShapeshiftAccountClick } />,
      <Button
        key='editmeta'
        icon={ <ContentCreate /> }
        label='edit'
        onClick={ this.onEditClick } />
    ];

    return (
      <Actionbar
        title='Account Management'
        buttons={ buttons } />
    );
  }

  renderEditDialog () {
    const { accounts, params } = this.props;
    const { editDialog } = this.state;

    if (!editDialog) {
      return null;
    }

    return (
      <EditMeta
        account={ accounts[params.address] }
        keys={ ['description', 'passwordHint'] }
        onClose={ this.onEditClick } />
    );
  }

  renderFundDialog () {
    const { fundDialog } = this.state;

    if (!fundDialog) {
      return null;
    }

    const { address } = this.props.params;

    return (
      <Shapeshift
        address={ address }
        onClose={ this.onShapeshiftAccountClose } />
    );
  }

  renderTransferDialog () {
    const { transferDialog } = this.state;

    if (!transferDialog) {
      return null;
    }

    const { address } = this.props.params;
    const { accounts, balances } = this.props;
    const account = accounts[address];
    const balance = balances[address];

    return (
      <Transfer
        account={ account }
        balance={ balance }
        balances={ balances }
        onClose={ this.onTransferClose } />
    );
  }

  onEditClick = () => {
    this.setState({
      editDialog: !this.state.editDialog
    });
  }

  onShapeshiftAccountClick = () => {
    this.setState({
      fundDialog: !this.state.fundDialog
    });
  }

  onShapeshiftAccountClose = () => {
    this.onShapeshiftAccountClick();
  }

  onTransferClick = () => {
    this.setState({
      transferDialog: !this.state.transferDialog
    });
  }

  onTransferClose = () => {
    this.onTransferClick();
  }
}

function mapStateToProps (state) {
  const { accounts } = state.personal;
  const { balances } = state.balances;
  const { isTest } = state.nodeStatus;

  return {
    isTest,
    accounts,
    balances
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
