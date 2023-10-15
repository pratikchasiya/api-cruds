import React, {Component, Fragment} from "react";
import axios from "axios";

class ApiClassCrud extends Component {
  constructor() {
    super();
    this.state = {
      array: [],
      obj: {
        category: "",
        productName: "",
        description: "",
        price: "",
        clothSize: [],
        inStock: "",
      },
      blankObj: {},
    };
  }

  getApiData = () => {
    axios
      .get("https://student-api.mycodelibraries.com/api/product/get")
      .then((res) => {
        console.log(res.data.data);
        this.setState({array: [...res.data.data]});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getApiData();
  }

  getData = (e) => {
    if (e.target.name == "clothSize") {
      if (e.target.checked) {
        this.state.obj.clothSize.push(e.target.value);
      } else {
        this.state.obj.clothSize = this.state.obj.clothSize.filter(
          (x) => x != e.target.value
        );
      }
      this.state.blankObj.clothSize = [];
    } else {
      this.state.obj[e.target.name] = e.target.value;
      this.state.blankObj[e.target.name] = "";
    }
    this.setState({obj: {...this.state.obj}});
    this.setState({blankObj: {...this.state.blankObj}});
  };

  save = () => {
    if (this.state.obj._id == undefined) {
      axios
        .post(
          "https://student-api.mycodelibraries.com/api/product/add",
          this.state.obj
        )
        .then((res) => {
          console.log(res);
          this.getApiData();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.state.obj.id = this.state.obj._id;
      axios
        .post(
          "https://student-api.mycodelibraries.com/api/product/update",
          this.state.obj
        )
        .then((res) => {
          console.log(res);
          this.getApiData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // setobj({ ...blankObj });
    this.setState({obj: {...this.state.blankObj}});
  };

  editData = (id) => {

    axios
      .get(
        "https://student-api.mycodelibraries.com/api/product/get-product-by-id?id="+
          id
      )
      .then((res) => {
        res.data.data.clothSize =
          res.data.data.clothSize.split(",");
        this.setState({obj: {...res.data.data}});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteData = (id)=>{
    axios.delete('https://student-api.mycodelibraries.com/api/product/delete?id='+id).then((res)=>{
      console.log(res)
      this.getApiData();
    }).catch((err)=>{
      console.log(err)
    })
  }

  render() {
    return (
      <Fragment>
        <div>ApiClassCrud</div>
        <form action="" className="w-50 mx-auto border border-1 p-4 mt-5">
          <h3>PRODUCT DETAILS </h3>
          <label htmlFor="" className="d-block">
            Category :
          </label>
          <select name="category" className="w-100" onChange={this.getData}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
          <label htmlFor="" className="d-block">
            Product Name :
          </label>
          <input
            type="text"
            name="productName"
            className="w-100"
            value={this.state.obj.productName || ""}
            onChange={this.getData}
          />
          <label htmlFor="" className="d-block">
            Description :
          </label>
          <textarea
            name="description"
            id=""
            cols="30"
            rows="2"
            className="w-100"
            value={this.state.obj.description || ""}
            onChange={this.getData}
          ></textarea>
          <label htmlFor="" className="d-block">
            Price :
          </label>
          <input
            type="number"
            name="price"
            className="w-100"
            value={this.state.obj.price || ""}
            onChange={this.getData}
          />
          <label htmlFor="" className="d-block">
            Cloth Size :
          </label>
          <input
            type="checkbox"
            name="clothSize"
            value="s"
            className="me-2"
            checked={this.state.obj.clothSize?.includes("s")}
            onChange={this.getData}
          />
          S
          <input
            type="checkbox"
            name="clothSize"
            value="m"
            className="mx-2"
            checked={this.state.obj.clothSize?.includes("m")}
            onChange={this.getData}
          />
          M
          <input
            type="checkbox"
            name="clothSize"
            value="l"
            className="mx-2"
            checked={this.state.obj.clothSize?.includes("l")}
            onChange={this.getData}
          />
          L
          <input
            type="checkbox"
            name="clothSize"
            value="xl"
            className="mx-2"
            checked={this.state.obj.clothSize?.includes("xl")}
            onChange={this.getData}
          />
          XL
          <input
            type="checkbox"
            name="clothSize"
            value="xxl"
            className="mx-2"
            checked={this.state.obj.clothSize?.includes("xxl")}
            onChange={this.getData}
          />
          XXL
          <br />
          <br />
          <label htmlFor="" className="d-block">
            Stock :
          </label>
          <input
            type="radio"
            name="inStock"
            value="In-Stock"
            className="me-2"
            checked={this.state.obj.inStock == "In-Stock"}
            onChange={this.getData}
          />
          In Stock
          <input
            type="radio"
            name="inStock"
            value="Out-Of-Stock"
            className="mx-2"
            checked={this.state.obj.inStock == "Out-Of-Stock"}
            onChange={this.getData}
          />
          Out-Of-Stock
          <br />
          <button
            type="button"
            className="btn btn-success mt-4"
            onClick={this.save}
          >
            Save
          </button>
        </form>

        {/* TABLE */}

        <table className="table mt-5">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Category</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Cloth Size</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {this.state.array?.map((x, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{x.category}</td>
                  <td>{x.productName}</td>
                  <td>{x.description}</td>
                  <td>{x.price}</td>
                  <td>{x.clothSize}</td>
                  <td>{x.inStock}</td>
                  <td>
                    <button
                      onClick={() => this.editData(x._id)}
                      className="btn btn-success me-2"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => this.deleteData(x._id)}
                      className="btn btn-danger"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}
export default ApiClassCrud;
