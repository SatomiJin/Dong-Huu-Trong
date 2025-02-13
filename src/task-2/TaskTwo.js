import Select from "react-select";
import { useEffect, useState } from "react";
import tokenIcons from "../components/IconSvg/tokenIcons";
import * as tokenService from "../services/tokenService";
import "./TaskTwo.scss";

function TaskTwo() {
  let [options, setOptions] = useState([]);
  let [result, setResult] = useState(0);
  let [sourceTargetQ, setSourceTargetQ] = useState(0);
  let [sourceToken, setSourceToken] = useState({});
  let [targetToken, setTargetToken] = useState({});
  const getTokenInfo = async () => {
    let res = await tokenService.getTokenInfo();
    if (res && res.length > 0) {
      setOptions(
        res.map((token) => ({
          value: token.price,
          label: token.currency,
          icon: tokenIcons[token?.currency] || "",
        }))
      );
    }
  };

  const handleChangeSource = (selectedOption) => {
    setSourceToken(selectedOption);
  };
  const handleChangeTarget = (selectedOption) => {
    setTargetToken(selectedOption);
  };
  const handleOnchangeQuantity = (e) => {
    setSourceTargetQ(e.target.value);
  };
  const handleConversion = () => {
    if (!sourceTargetQ) {
      alert("Please fill quantity you want to conversion!!");
    }

    let resultConversion =
      (sourceToken.value * sourceTargetQ) / targetToken.value;

    setResult(resultConversion);
  };
  useEffect(() => {
    getTokenInfo();
  }, []);
  return (
    <div className="task_two-container">
      <div className="form row">
        <div className="title col-lg-12">
          Token conversion - Responsive <i className="fa-solid fa-coins"></i>
        </div>
        <div className="left-content row col-lg-6 col-md-6 col-sm-12">
          <div className="source-token col-lg-12">
            <label>Source Token</label>
            <Select
              // className="form-control"
              value={sourceToken}
              onChange={handleChangeSource}
              options={options}
              getOptionLabel={(e) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {e.icon && (
                    <img
                      src={e.icon}
                      alt={e.label}
                      style={{ width: 20, height: 20, marginRight: 10 }}
                    />
                  )}
                  {e.label}
                </div>
              )}
              filterOption={(option, inputValue) => {
                return (
                  option.data.label
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                  option.data.value.toString().includes(inputValue) // Tìm kiếm theo `value`
                );
              }}
            />
          </div>
          <div className="price_source-token col-lg-12">
            <label htmlFor="">Price:</label>
            <input
              className="form-control"
              type="text"
              name="source_price"
              value={sourceToken?.value}
              disabled
            />
          </div>

          <div className="quantity_source-token col-lg-12">
            <label>Quantity</label>
            <input
              type="number"
              className="form-control"
              name="source_quantity"
              value={sourceTargetQ}
              onChange={(e) => handleOnchangeQuantity(e)}
            />
          </div>
        </div>

        <div className="right-content row col-lg-6 col-md-6 col-sm-12">
          <div className="target-token col-lg-12">
            <label>Target Token</label>
            <Select
              // className="form-control"
              value={targetToken}
              onChange={handleChangeTarget}
              options={options}
              getOptionLabel={(e) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {e.icon && (
                    <img
                      src={e.icon}
                      alt={e.label}
                      style={{ width: 20, height: 20, marginRight: 10 }}
                    />
                  )}
                  {e.label}
                </div>
              )}
              filterOption={(option, inputValue) => {
                return (
                  option.data.label
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                  option.data.value.toString().includes(inputValue) // Tìm kiếm theo `value`
                );
              }}
            />
          </div>

          <div className="price_target-token col-lg-12">
            <label htmlFor="">Price:</label>
            <input
              className="form-control"
              type="text"
              name="target_price"
              value={targetToken?.value}
              disabled
            />
          </div>

          <div className="quantity_target-token col-lg-12">
            <label>Result</label>
            <input
              type="number"
              className="form-control"
              name="target_quantity"
              value={result}
            />
          </div>
        </div>
        <button
          className="conversion col-lg-12 btn btn-outline-success mt-3"
          type="button"
          onClick={handleConversion}
        >
          Conversion <i className="fa-solid fa-right-left"></i>
        </button>
      </div>
    </div>
  );
}

export default TaskTwo;
