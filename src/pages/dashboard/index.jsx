import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Form,
  Table,
  Tag,
  Input,
  Button,
  Space,
  Drawer,
  InputNumber,
} from "antd";
import { AuthProviderAPI } from "../../context/Auth";
import axios from "axios";
import "./style.css";
import jwt_decode from "jwt-decode";

const MainPage = () => {
  const [data, setData] = useState([]);
  const { token, setAuth, setToken } = useContext(AuthProviderAPI);
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [edit, setEdit] = useState({ ID: data.total, Code:'', Bankname: '', Stateid:'' });
  
  const showDrawer = () => {
    setVisible(true);
    setEdit({...edit, ID: data.total})
  };
  
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  
  const onClose = () => {
    setVisible(false);
    setEdit({ID: '', Code: '', Bankname: '', Stateid:'0'})
  };
  
  const onLogOut = () => {
    if (window.confirm("tark etmoqchimisiz")) {
      setToken(null);
      setAuth(false);
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
    }
  };
  
  const link = axios.create({
    baseURL: "http://templ-api.webase.uz",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  const dataUpload = () => {
    link
    .get(`/Bank/GetList?PageNumber=${1}&PageLimit=${801}`)
    .then((res) => {
      setData(res.data);
      setEdit({ ...edit, ID: ++res.data.total });
    })
    .catch((err) => console.log(err));
  };
  useEffect(() => dataUpload(), []);
  
  const onDelete = (id) => {
    if (window.confirm("siz ushbu malumotni o'chirmoqchimisiz")) {
      link.delete(`/Bank/Delete?id=${id}`);
      dataUpload();
    }
  };

  const onSearch = (e) => {
    link
      .get(
        `Bank/GetList?Search=${e.target.value}&PageNumber=1&PageLimit=${801}`
      )
      .then((res) => setData(res.data));
  };

  const onChangeInp = (change)=>{
    setEdit({...edit, ...change})
  }

  const code = useRef(null);
  const bankName = useRef(null);
  const stateid = useRef(null);

  const onSubmit = () => {
    link.post("/Bank/Update", edit)
    .catch((err) => console.log(err));
    
    setEdit({Code: '', Bankname: '', Stateid: ''})
    onClose();
    dataUpload();
  };

  const onEdit = (id) => {
    showDrawer();
    link
    .get(`Bank/Get?id=${id}`)
    .then((res) => res.data)
    .then((item) => {
      setEdit(item)
    });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (tag) => {
        let color = tag.length > 5 ? "geekblue" : "green";
        if (tag === "ПАССИВ") {
          color = "volcano";
        }
        return (
          <Tag color={color} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a onClick={() => onEdit(record.id)}>Edit</a>
          <a onClick={() => onDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="header">
        <Drawer
          title="Drawer with extra actions"
          placement={placement}
          width={500}
          onClose={onClose}
          visible={visible}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }
        >
          <Form>
            <Form.Item label="Code">
              <Input ref={code} value={edit['Code']} onChange={(e)=>onChangeInp({'Code': e.target.value??''})} placeholder="Code" />
            </Form.Item>
            <Form.Item label="Bank name">
              <Input ref={bankName} value={edit['Bankname']} onChange={(e)=>onChangeInp({'Bankname': e.target.value??''})} placeholder="Bank name" />
            </Form.Item>
            <Form.Item label="Stateid">
              <InputNumber ref={stateid} e={edit['Stateid']} onChange={(e)=>onChangeInp({'Stateid': e??''})} min={0} max={1} defaultValue={0} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={onSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
        <Button type="primary" onClick={showDrawer}>
          Add new item
        </Button>
        <Input placeholder="search items" className="antd" onChange={(e) => onSearch(e)} />
        <h4>
          {jwt_decode(localStorage.getItem("token")).name}
          <Button type="primary" onClick={onLogOut}>
            log out
          </Button>
        </h4>
      </div>
      <div className="containerTable">
        <Table rowKey={"id"} columns={columns} dataSource={data.rows} />
      </div>
    </div>
  );
};

export default MainPage;
