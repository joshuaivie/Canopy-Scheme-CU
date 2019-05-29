import React from "react";
import { Button, Card, Col, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RenderEmptyGroup = columns => (
    <td
        colSpan={columns.length}
        style={{ textAlign: "center", fontWeight: "bolder", padding: "30px" }}
    >
        <div className="text-center">
            <Button>
                Create Group
                <FontAwesomeIcon icon="users" />
            </Button>
            <br />
            <br />

            <p>
                Create a group to make sure your friends and famiily sit near
                you
            </p>
        </div>
    </td>
);

const RenderGroupHistory = (data, columns) => (
    <tr>
        {columns.map(column => (
            <td key={column.name}>{column.name}</td>
        ))}
    </tr>
);

const DisplayGroupMembers = props => {
    return (
        <Table borderless hover responsive>
            <tbody>
                {props.data.length > 0
                    ? RenderEmptyGroup(props.columns)
                    : RenderGroupHistory(props.columns)}
            </tbody>
        </Table>
    );
};

class Groups extends React.Component {
    state = {
        data: [
            // {
            // 	date: "12-03-19",
            // 	amount: "15,000",
            // 	tables: "1"
            // },
            // {
            // 	date: "26-03-19",
            // 	amount: "45,000",
            // 	tables: "3"
            // }
        ]
    };
    render() {
        return (
            <Col xs="12" md="12">
                <Card className="material-card">
                    <Card.Header>
                        <h5>Group</h5>
                        <Button variant="outline-danger">
                            Leave Group
                            <FontAwesomeIcon icon="door-open" />
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <br />
                        <h6>Members</h6>
                        <p>
                            <FontAwesomeIcon icon="user-circle" /> Femi Ajisafe
                        </p>
                        <p>
                            <FontAwesomeIcon icon="user-circle" /> Paul Kimberly
                        </p>
                        <Button variant="outline-success">
                            Invite new member
                            {"  "}
                            <FontAwesomeIcon icon="user-plus" />
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default Groups;
