import PropTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit, errors } = useForm({
    validationSchema: validationSchema,
  });
  const [dayStart, setDayStart] = useState(new Date().toISOString());
  const [dayEnd, setDayEnd] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
  );
  const { handleReturnHome, handleOnSubmit, handleSubmitEdit, todo } = props;
  
  const onChangeDateStart = (data) => {
    setDayStart(data);
  };
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
  const onEdit = (data)=>{
    data.id = todo.id;
    handleSubmitEdit(data);
    history.push("/todo");
    console.log(data);
  }
  if(Object.keys(todo).length !== 0) return (
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
              defaultValue={todo.todoTitle}
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
              defaultValue={todo.todoContent}
              id="todoText"
              className="todoText"
              {...register("todoContent", { required: true })}
              placeholder="Công việc cần làm"
            />
          </InputGroup>
          <InputGroup className="justify-content-between">
            <div className="d-flex align-items-center form-date-picker">
              <InputGroupAddon className="add-on-date" addonType="prepend">
                <InputGroupText>Ngày bắt đầu</InputGroupText>
              </InputGroupAddon>
              <DatePicker
                {...register("daystart", { required: true })}
                value={todo.daystart}
                onChange={onChangeDateStart}
                className="date-picker"
              />
            </div>
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
  )
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
          <InputGroup className="justify-content-between">
            <div className="d-flex align-items-center form-date-picker">
              <InputGroupAddon className="add-on-date" addonType="prepend">
                <InputGroupText>Ngày bắt đầu</InputGroupText>
              </InputGroupAddon>
              <DatePicker
                {...register("daystart", { required: true })}
                value={dayStart}
                onChange={onChangeDateStart}
                className="date-picker"
              />
            </div>
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
