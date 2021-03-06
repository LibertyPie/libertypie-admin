/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

import { Component } from "react";
import { AiFillEdit, AiFillDelete, AiFillDatabase } from "react-icons/ai";
import { deleteCategory, getCategories } from "../../actions/categoryActions";
import CategoryModal from "../Modals/CategoryModal";
import { connect } from "react-redux";

class CategoryCard extends Component {
  state = {};

  /**
   * initiate deletion of category
   */
  deleteCategory = async () => {
    await this.props.deleteCategory(
      this.props.id,
      this.props.account,
      this.props.contract
    );

    await this.props.getCategories(this.props.contract);
  };

  /**
   * List Subcategories
   */
  listSubCategories = async () => {
    await this.props.openSubcat(this.props.id, this.props.cat);
  };

  render() {
    return (
      <div className={"card-1 " + (this.props.active && "active")}>
        <div className="top-right">
          <CategoryModal categoryId={this.props.id}>
            <span className="link">
              <AiFillEdit />
            </span>
          </CategoryModal>
          <span className="link ml20px" onClick={this.deleteCategory}>
            <AiFillDelete />
          </span>
          <span className="link ml20px" onClick={this.listSubCategories}>
            <AiFillDatabase />
          </span>
        </div>
        <br />
        <br />
        <div className="clear"></div>
        <div className="img">
          <div>{this.props.cat}</div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { contract, account } = state.common;
  const { errorDelete, loadingDelete } = state.category;

  return { contract, account, errorDelete, loadingDelete };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCategory: (id, account, contract) =>
      dispatch(deleteCategory(id, account, contract)),
    getCategories: (contract) => dispatch(getCategories(contract)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);
