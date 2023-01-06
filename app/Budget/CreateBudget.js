import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiEdit, BiTrashAlt, BiShow, BiRepost } from "react-icons/bi";

export default function CreateBudget({ session }) {
  const [budgetForm, setBudgetForm] = useState([
    {
      funder: "",
      project: "",
      program: [
        {
          programName: "",
          programRemark: "",
          activity: [
            {
              activityName: "",
              activityRemark: "",
              items: [
                {
                  item: "",
                  qty: "",
                  rate: "",
                  amount: "",
                  remark: "",
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const addProgram = (i) => {
    const tiers = [...budgetForm];
    budgetForm.map((dt) =>
      dt.program.push({
        programName: "",
        programRemark: "",
        activity: [
          {
            activityName: "",
            activityRemark: "",
            items: [
              {
                item: "",
                qty: "",
                rate: "",
                amount: "",
                remark: "",
              },
            ],
          },
        ],
      })
    );
    setBudgetForm(tiers);
  };

  const removeProgram = (i, j) => {
    const tiers = [...budgetForm];
    tiers[i].program.splice(j, 1);
    setBudgetForm(tiers);
  };

  const addActivity = (i) => {
    const tiers = [...budgetForm];
    budgetForm.map((dt) =>
      dt.program[i].activity.push({
        activityName: "",
        activityRemark: "",
        items: [
          {
            item: "",
            qty: "",
            rate: "",
            amount: "",
            remark: "",
          },
        ],
      })
    );
    setBudgetForm(tiers);
  };

  const removeActivity = (i) => {
    const tiers = [...budgetForm];
    tiers.map((dt) => dt.program[i].activity.splice(j, 1));
    setBudgetForm(tiers);
  };

  const addItems = (i, j) => {
    const tiers = [...budgetForm];
    budgetForm.map((dt) =>
      dt.program[j].activity[i].items.push({
        item: "",
        qty: "",
        rate: "",
        amount: "",
        remark: "",
      })
    );
    setBudgetForm(tiers);
  };

  const removeItem = (i, j, k) => {
    const tiers = [...budgetForm];
    tiers.map((dt) => dt.program[i].activity[j].items.splice(k, 1));
    setBudgetForm(tiers);
  };

  const handleChange = (i, e) => {
    let newFormValues2 = [...budgetForm];
    newFormValues2[i][e.target.name] = e.target.value;
    setBudgetForm(newFormValues2);
  };

  const handleChangeProgram = (i, j, e) => {
    let newFormValues2 = [...budgetForm];
    newFormValues2[i].program[j][e.target.name] = e.target.value;
    setBudgetForm(newFormValues2);
  };

  const handleChangeActivity = (i, j, k, e) => {
    let newFormValues2 = [...budgetForm];
    newFormValues2.map(
      (dt) => (dt.program[j].activity[k][e.target.name] = e.target.value)
    );
    setBudgetForm(newFormValues2);
  };

  const handleChangeItems = (i, j, k, l, e) => {
    let newFormValues2 = [...budgetForm];
    // newFormValues2.map((dt) =>
    //   dt.program.map(
    //     (itm) => (itm.activity[k].items[l][e.target.name] = e.target.value)
    //   )
    // );
    newFormValues2[i].program[j].activity[k].items[l][e.target.name] =
      e.target.value;
    setBudgetForm(newFormValues2);
  };

  async function onSubmit(event) {
    event.preventDefault();
    const data = JSON.stringify(budgetForm);
    console.log(data);
  }

  return (
    <div className="max-w-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <form>
        {budgetForm.map((item, index) => (
          <div key={index}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="funder"
                  className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
                >
                  Funder
                </label>
                <input
                  type="text"
                  id="funder"
                  name="funder"
                  value={item.funder}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Funder"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="project"
                  className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
                >
                  Project
                </label>
                <input
                  type="text"
                  id="project"
                  name="project"
                  value={item.project}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Project"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            {item.program.map((proItem, proIndex) => (
              <>
                <div className="divide-y-[3px]">
                  <div className="flex gap-1 items-center">
                    <h2># {proIndex + 1}</h2>
                    <h1 className="py-2 font-bold text-md underline">
                      Program
                    </h1>
                  </div>
                  <div
                    className="grid gap-6 md:grid-cols-3 py-2"
                    key={proIndex}
                  >
                    <div>
                      <label
                        htmlFor="programName"
                        className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
                      >
                        Program Name
                      </label>
                      <input
                        type="text"
                        id="programName"
                        name="programName"
                        value={proItem.programName}
                        onChange={(e) =>
                          handleChangeProgram(index, proIndex, e)
                        }
                        placeholder="Program Name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="programRemark"
                        className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
                      >
                        Program Remark
                      </label>
                      <input
                        type="text"
                        id="programRemark"
                        name="programRemark"
                        value={proItem.programRemark}
                        onChange={(e) =>
                          handleChangeProgram(index, proIndex, e)
                        }
                        placeholder="Program Remark"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div className="self-center pt-6 gap-x-5">
                      {proIndex ? (
                        <button
                          type="button"
                          onClick={() => removeProgram(index, proIndex)}
                          className="text-3xl text-red-600"
                        >
                          <BiTrashAlt />
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => addProgram(proIndex)}
                        className="text-3xl text-green-600"
                      >
                        <IoMdAddCircleOutline />
                      </button>
                    </div>
                  </div>
                </div>
                {proItem.activity.map((actItem, actIndex) => (
                  <>
                    <div className="flex gap-1 items-center">
                      <h2># {actIndex + 1}</h2>
                      <h1 className="py-2 font-bold text-md underline">
                        Activity
                      </h1>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3" key={actIndex}>
                      <div>
                        <label
                          htmlFor="activityName"
                          className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
                        >
                          Activity Name
                        </label>
                        <input
                          type="text"
                          id="activityName"
                          name="activityName"
                          value={actItem.activityName}
                          onChange={(e) =>
                            handleChangeActivity(index, proIndex, actIndex, e)
                          }
                          placeholder="Activity Name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="activityRemark"
                          className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
                        >
                          Activity Remark
                        </label>
                        <input
                          type="text"
                          id="activityRemark"
                          name="activityRemark"
                          value={actItem.activityRemark}
                          onChange={(e) =>
                            handleChangeActivity(index, proIndex, actIndex, e)
                          }
                          placeholder="Activity Remark"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                      <div className="self-center pt-6 gap-x-5">
                        {actIndex ? (
                          <button
                            type="button"
                            onClick={() => removeActivity(proIndex, actIndex)}
                            className="text-3xl text-red-600"
                          >
                            <BiTrashAlt />
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => addActivity(proIndex)}
                          className="text-3xl text-green-600"
                        >
                          <IoMdAddCircleOutline />
                        </button>
                      </div>
                    </div>
                    {actItem.items.map((ele, i) => (
                      <>
                        <div className="flex gap-1 items-center ">
                          <h2># {i + 1}</h2>
                          <h1 className="py-2 font-bold text-md underline">
                            Items
                          </h1>
                        </div>
                        <div className="grid gap-6 md:grid-cols-6" key={i}>
                          <div>
                            <label
                              htmlFor="item"
                              className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
                            >
                              Item
                            </label>
                            <input
                              type="text"
                              id="item"
                              name="item"
                              value={ele.item}
                              onChange={(e) =>
                                handleChangeItems(
                                  index,
                                  proIndex,
                                  actIndex,
                                  i,
                                  e
                                )
                              }
                              placeholder="Item"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="qty"
                              className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
                            >
                              Qty
                            </label>
                            <input
                              type="text"
                              id="qty"
                              name="qty"
                              value={ele.qty}
                              onChange={(e) =>
                                handleChangeItems(
                                  index,
                                  proIndex,
                                  actIndex,
                                  i,
                                  e
                                )
                              }
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              placeholder="Qty"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="rate"
                              className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
                            >
                              Rate
                            </label>
                            <input
                              type="text"
                              id="rate"
                              name="rate"
                              value={ele.rate}
                              onChange={(e) =>
                                handleChangeItems(
                                  index,
                                  proIndex,
                                  actIndex,
                                  i,
                                  e
                                )
                              }
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              placeholder="Rate"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="amount"
                              className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
                            >
                              Amount
                            </label>
                            <input
                              type="text"
                              id="amount"
                              name="amount"
                              value={ele.amount}
                              onChange={(e) =>
                                handleChangeItems(
                                  index,
                                  proIndex,
                                  actIndex,
                                  i,
                                  e
                                )
                              }
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              placeholder="Amount"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="remark"
                              className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
                            >
                              Remark
                            </label>
                            <input
                              type="text"
                              id="remark"
                              name="remark"
                              value={ele.remark}
                              onChange={(e) =>
                                handleChangeItems(
                                  index,
                                  proIndex,
                                  actIndex,
                                  i,
                                  e
                                )
                              }
                              placeholder="Remark"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                          <div className="self-center pt-6 gap-x-5">
                            {i ? (
                              <button
                                type="button"
                                onClick={() =>
                                  removeItem(proIndex, actIndex, i)
                                }
                                className="text-3xl text-red-600"
                              >
                                <BiTrashAlt />
                              </button>
                            ) : null}
                            <button
                              type="button"
                              onClick={() => addItems(actIndex, proIndex)}
                              className="text-3xl text-green-600"
                            >
                              <IoMdAddCircleOutline />
                            </button>
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                ))}
                <br/>
              </>
            ))}
          </div>
        ))}
        <button
          type="submit"
          onClick={onSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
