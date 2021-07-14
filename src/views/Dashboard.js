import React, { useEffect, useState, useMemo } from "react";

// reactstrap components
import { Button, Card, CardHeader, CardBody, NavItem, NavLink, Nav, Progress, Table, Container, Row, Col, Input, CustomInput, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText } from "reactstrap";

import Header from "../components/Headers/Header"
import TableContainer from './TableContainer.js'

import { maingradient } from '../components/Style/css_style'

const Index = (props) => {
  // to store the fetched data
  const [fetchedData, setFetchedData] = useState([])

  useEffect(() => {
    // to set the fetched data
    fetch("http://localhost:5000/interns")
      .then(response => response.json())
      .then(data => {
        setFetchedData(data)
      })
      .catch(error => console.log(error))
  }, [])


  // Column Headers for the table
    const columns = useMemo(() => [
        {
            Header: "Sr.No.",
            Cell: ({ row }) => {
                return <span>{parseInt(row.id) + 1}</span>
            },
        },
        {
            Header: "Organisation",
            accessor: "company",
        },
        {
            Header: "Profile",
            accessor: "role",
        },
        {
            Header: "Internship Name",
            accessor: "intern_name",
            disableSortBy: true,
        },
        {
            Header: "Deadline",
            accessor: "deadline",
            disableSortBy: true
        },
        {
            Header: 'Details',
            id: 'expander', // 'id' is required
            Cell: ({ row }) => (
                <Button color="primary" size="sm"{...row.getToggleRowExpandedProps()}>
                    {row.isExpanded ? ' -' : '+'}
                </Button>
            )
        },
    ], [])


  return (
    <>
      {/* <Header /> */}
      <div style={maingradient}>
        <TableContainer columns={columns} data={fetchedData} />
      </div>
    </>
  );
};

export default Index;
