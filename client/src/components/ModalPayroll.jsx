import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalPayroll = ({ isOpen, onClose }) => {
  const [range, setRange] = useState("monthly");
  const [payrollData, setPayrollData] = useState({});
  const navigate = useNavigate();

  const userToken = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(userToken.split(".")[1]));
  const userId = decodedToken.user_id;

  useEffect(() => {
    const fetchPayrollData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/salary/payroll/${userId}?range=${range}`
        );
        setPayrollData(response.data);
      } catch (error) {
        console.error("Error fetching payroll data:", error);
      }
    };

    fetchPayrollData();
  }, [userId, range]);

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"black"}>My Revenue</ModalHeader>
        <ModalCloseButton />
        <ModalBody color={"black"}>
          <Box mb="4">
            <Select value={range} onChange={handleRangeChange}>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </Select>
          </Box>
          {/* <Text>
            User ID: {payrollData.user_id} - Full Name: {payrollData.fullname}
          </Text> */}
          <Text>Name: {payrollData.fullname}</Text>
          <Text>
            Start Date:{" "}
            {new Date(payrollData.startDate).toLocaleDateString("id")}
          </Text>
          <Text>
            End Date: {new Date(payrollData.endDate).toLocaleDateString("id")}
          </Text>
          <Text mb={6}>Total Earnings: {payrollData.totalEarnings}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalPayroll;