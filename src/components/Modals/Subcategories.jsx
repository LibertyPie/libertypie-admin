import { Component } from "react";
import { AiOutlineClose, AiFillEdit, AiFillDelete } from "react-icons/ai";
import EditSubcategory from "./EditSubcategory";
import { connect } from "react-redux";
import {
  deleteSubcategory,
  getSubcategoryList,
} from "../../actions/subcategoryActions";

class Subcategories extends Component {
  state = {};

  /**
   * Load subcategory list
   */
  async componentDidMount() {
    await this.props.getSubcategoryList(this.props.catId, this.props.contract);
  }

  /**
   * delete subcategory of id
   * @param {int} id
   */
  deleteSubcat = async (id) => {
    await this.props.deleteSubcategory(
      id,
      this.props.account,
      this.props.contract
    );

    await this.props.getSubcategoryList(this.props.catId, this.props.contract);
  };

  render() {
    return (
      <div className="sub-panel">
        <div className="float-right link">
          <AiOutlineClose onClick={this.props.close} />
        </div>
        <h2>{this.props.catName}</h2>
        <br />
        <br />
        <table className="table">
          <tbody>
            {this.props.list.map(
              (subcat) =>
                subcat.name && (
                  <tr key={subcat.id}>
                    <td width="60%">{subcat.name}</td>
                    <td>
                      <EditSubcategory
                        category_id={this.props.catId}
                        subcatId={subcat.id}
                      >
                        <AiFillEdit className="link" />
                      </EditSubcategory>
                    </td>
                    <td>
                      <AiFillDelete
                        className="link"
                        onClick={() => this.deleteSubcat(subcat.id)}
                      />
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
        {(this.props.loading || this.props.loadingDelete) && (
          <div class="placeholder mb-4">
            <div class="animated-background"></div>
          </div>
        )}
        <EditSubcategory category_id={this.props.catId}>
          <div className="addSubcat-btn">Add New</div>
        </EditSubcategory>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { contract, account } = state.common;
  const { list, loading, error } = state.subcategoryList;
  const { loadingDelete, errorDelete } = state.subcategory;

  return {
    contract,
    account,
    list,
    loading,
    error,
    loadingDelete,
    errorDelete,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSubcategoryList: (id, contract) =>
      dispatch(getSubcategoryList(id, contract)),
    deleteSubcategory: (id, account, contract) =>
      dispatch(deleteSubcategory(id, account, contract)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subcategories);
