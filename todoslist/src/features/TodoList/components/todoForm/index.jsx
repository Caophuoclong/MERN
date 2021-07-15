import PropTypes from "prop-types";
import React, { useState } from "react";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import "./todoForm.scss";
import DatePicker from "reactstrap-date-picker";
import * as yup from "yup";

TodoForm.propTypes = {
  handleOnSubmit: PropTypes.func,
  handleReturnHome: PropTypes.func,
  handleSubmitEdit: PropTypes.func,
  todo: PropTypes.object,
};

TodoForm.defaultProps = {
  handleOnSubmit: null,
  handleReturnHome: null,
  handleSubmitEdit: null,
  todo: {},
};

function TodoForm(props) {
  const history = useHistory();
  const validationSchema = yup.object().shape({
    todoContent: yup.string().required("Bắt buộc phải nhập"),
    dayend: yup.date().min(new Date().toISOString()),
  });
  const { register, handleSubmit, control } = useForm({
    validationSchema: validationSchema,
  });
  const [dayStart, setDayStart] = useState(new Date().toISOString());
  const [dayEnd, setDayEnd] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
  );
  const { handleReturnHome, handleOnSubmit, handleSubmitEdit, todo } = props;
  const options = [
    { value: "important", label: "Important" },
    { value: "normal", label: "Normal" },
    { value: "not-important", label: "Not important" },
  ];

  const onChangeDateEnd = (data) => {
    if (!(data <= new Date().toDateString()) || data < dayStart) {
      alert(
        "Ngày không hợp lệ, ngày kết thúc phải lớn hơn ngày hiện tại hoặc phải lớn hơn ngày bắt đầu"
      );
      setDayEnd(dayEnd);
    } else {
      setDayEnd(data);
    }
  };
  const onSubmit = (data, e) => {
    handleOnSubmit(data, e);
  };
  const onEdit = (data) => {
    data.id = todo.id;
    handleSubmitEdit(data);
    history.push("/todo");
    console.log(data);
  };
  if (Object.keys(todo).length !== 0)
    return (
      <div>
        <Container>
          <h1 className="title">Nhập lại thông tin cần chỉnh sửa</h1>
          <Form onSubmit={handleSubmit(onEdit)}>
            <InputGroup>
              {" "}
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Tiêu đề</InputGroupText>
              </InputGroupAddon>
              <Input
                autoFocus={true}
                
                id="todoText"
                className="todoText"
                {...register("todoTitle")}
                defaultValue={todo.todoTitle}
                placeholder="Công việc cần làm"
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Nội dung</InputGroupText>
              </InputGroupAddon>
              <Input
               {...register("todoContent", {required: true})}
                id="todoText"
                className="todoText"
                
                defaultValue={todo.todoContent}
                placeholder="Công việc cần làm"
              />
            </InputGroup>
            <Controller
              name="select-value"
              {...register("todoSelect")}
              control={control}
              defaultValue={todo.todoSelect}

              render={({ field }) => (
                <Select
                  className="form-select-level"
                  {...field}
                  options={options}
                />
              )}
            />
            <InputGroup className="justify-content-center">
              <div className="d-flex align-items-center form-date-picker">
                <InputGroupAddon className="add-on-date" addonType="prepend">
                  <InputGroupText>Ngày Kết thúc</InputGroupText>
                </InputGroupAddon>
                <DatePicker
                  {...register("dayend", {
                    required: true,
                    validate: (value) => value >= new Date().toISOString(),
                  })}
                  value={todo.dayend}
                  onChange={onChangeDateEnd}
                  className="date-picker"
                />
              </div>
            </InputGroup>
            <InputGroup className="justify-content-center">
              <Button type="submit">Submit</Button>
            </InputGroup>
          </Form>
        </Container>
      </div>
    );
  return (
    <div>
      <Container>
        <h1 className="title">Nhập thông tin việc cần làm</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            {" "}
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Tiêu đề</InputGroupText>
            </InputGroupAddon>
            <Input
              defaultValue=""
              id="todoText"
              className="todoText"
              {...register("todoTitle")}
              placeholder="Công việc cần làm"
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Nội dung</InputGroupText>
            </InputGroupAddon>
            <Input
              defaultValue=""
              id="todoText"
              className="todoText"
              {...register("todoContent", { required: true })}
              placeholder="Công việc cần làm"
            />
          </InputGroup>
          <Controller
            name="select-value"
            {...register("todoSelect")}
            control={control}
            render={({ field }) => (
              <Select
              className="form-select-level"
                {...field}
                options={options}
              />
            )}
          />
          <InputGroup className="justify-content-center">
            <div className="d-flex align-items-center form-date-picker">
              <InputGroupAddon className="add-on-date" addonType="prepend">
                <InputGroupText>Ngày Kết thúc</InputGroupText>
              </InputGroupAddon>
              <DatePicker
                {...register("dayend", {
                  required: true,
                  validate: (value) => value >= new Date().toISOString(),
                })}
                value={dayEnd}
                onChange={onChangeDateEnd}
                className="date-picker"
              />
            </div>
          </InputGroup>
          <InputGroup className="justify-content-center">
            <Button type="submit">Submit</Button>
            <Button onClick={handleReturnHome} style={{ marginLeft: "15px" }}>
              Return Home
            </Button>
          </InputGroup>
        </Form>
      </Container>
    </div>
  );
}

export default TodoForm;
