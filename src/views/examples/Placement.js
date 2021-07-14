import React, { useEffect, useState, useMemo } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Input,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  FormText,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchPlacements } from "../../utils/requests";

// import Header from "../components/Headers/Header"
import TableContainer from "../TableContainer";
import {
  applybtnshadow,
  headingstyle,
  expandbgstyle,
  maingradient,
} from "../../components/Style/css_style";
import Apply from "../../components/Modal/ApplyForm";

const Placement = (props) => {
  // to store the fetched data
  const [fetchedData, setFetchedData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();

  // fetch eligible Placements
  useEffect(() => {
    dispatch(fetchPlacements());
  }, []);

  const eligiblePlacement = useSelector(
    (state) => state.changeUserState.eligiblePlacement
  );
  console.log(eligiblePlacement);

  // Expandable Row
  const renderRowSubComponent = (fetchedData, cells) => {
    let index = parseInt(cells[0]["row"]["id"]);

    return (
      <Card style={expandbgstyle}>
        <CardBody>
          <strong style={headingstyle}>Job Details</strong>
          <p>{fetchedData[index]["details"]}</p>
          <strong style={headingstyle}>About the Company</strong>
          <p>{fetchedData[index]["about"]}</p>
          <Button style={applybtnshadow} color="success" onClick={toggle}>
            Apply
          </Button>
        </CardBody>
      </Card>
    );
  };

  // Column Headers for the table
  const columns = useMemo(
    () => [
      {
        Header: "Sr.No.",
        Cell: ({ row }) => {
          return <span>{parseInt(row.id) + 1}</span>;
        },
      },
      {
        Header: "Organisation",
        accessor: "company",
      },
      {
        Header: "Placement Name",
        accessor: "placement_name",
      },
      {
        Header: "Profile",
        accessor: "role",
      },
      {
        Header: "Deadline",
        accessor: "deadline",
        disableSortBy: true,
      },
      {
        Header: "Details",
        id: "expander", // 'id' is required
        Cell: ({ row }) => (
          <Button
            color="primary"
            size="sm"
            {...row.getToggleRowExpandedProps()}
          >
            {row.isExpanded ? " -" : "+"}
          </Button>
        ),
      },
    ],
    []
  );

  // toggle modal visibility
  const toggle = () => setIsModal(!isModal);

  return (
    <>
      {/* <Header /> */}
      <Modal isOpen={isModal} toggle={toggle}>
        <ModalBody>
          <Apply />
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle}>
            Submit
          </Button>{" "}
          <Button outline color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <div style={maingradient}>
        <div>
          <TableContainer
            columns={columns}
            data={
              eligiblePlacement == undefined ? fetchedData : eligiblePlacement
            }
            renderRowSubComponent={renderRowSubComponent}
          />
        </div>
      </div>
    </>
  );
};

export default Placement;
