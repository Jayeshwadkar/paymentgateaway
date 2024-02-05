import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";

import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useEffect, useMemo } from "react";
import countryList from "react-select-country-list";
// import Receipt from './Receipt';
import { PayPalButtons } from "@paypal/react-paypal-js";
//import Modal from 'react-modal';

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import axios from "axios";

import {
  Container,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  Paper,
  useTheme,
  styled,
  InputLabel,
  Checkbox,
} from "@mui/material";
import { payPalPayment, sendOrderId } from "./lib/api-payment";
import Model from "./Model";
import zIndex from "@mui/material/styles/zIndex";
import { useNavigate } from "react-router-dom";
import "./App.css";
import {
  ADD_BASE_PATH,
  Add_BASE_PATH,
  PAYMENT_BASE_PATH,
  RAZOR_BASE_PATH,
} from "./lib/api-base-path";
import dayjs from "dayjs";

// import {DatePicker} from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.spacing(1),
}));

const StyledFormControl = styled(FormControl)({
  marginBottom: ({ theme }) => theme.spacing(2),
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
function Papel() {
  const theme = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const options = useMemo(() => countryList().getData(), []);

  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountevent, setAmountEvet] = useState(0);
  const [openfail, setOpenfail] = useState(false);
  const [openfail2, setOpenfail2] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClosefail = () => setOpenfail(false);
  const handleClosefail2 = () => setOpenfail2(false);
  const [orderid, setOrderid] = useState([""]);
  const [open2, setOpen2] = useState(false);
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  //const navigate = useNavigate();
  const [clickon,setClickon]= useState(false)
  const [selectedValue, setSelectedValue] = useState(null);
  const [formData, setFormData] = useState({
    country: "",
    memberType: "",
    registrationType: "",
    name: "",
    email: "",
    organization: "",
    designation: "",
    address: "",
    postalCode: "",
    dob: dayjs(Date.now()),
    passportNo: "",
    dateOfIssue: dayjs(Date.now()),
    dateOfExpiry: dayjs(Date.now()),
    placeOfIssue: "",
    dateOfArrival: dayjs(Date.now()),
    dateOfDeparture: dayjs(Date.now()),
  });

  let defaultAmount ;

  if (selectedValue === "India") {
    if (amount === 10 && amountevent === 10) {
      defaultAmount = 20000;
      // defaultAmount = 1;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount == 10 && amountevent == 1) {
      defaultAmount = 8000;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 10 && amountevent === 2) {
      defaultAmount = 25000;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 10 && amountevent === 3) {
      defaultAmount = 10000;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 1 && amountevent === 10) {
      defaultAmount = 25000;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 1 && amountevent === 1) {
      defaultAmount = 10000;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 1 && amountevent === 2) {
      defaultAmount = 31250;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 1 && amountevent === 3) {
      defaultAmount = 10000;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 2 && amountevent === 10) {
      defaultAmount = 8000;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 2 && amountevent === 1) {
      defaultAmount = 4000;
      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 2 && amountevent === 2) {
      defaultAmount = 10000;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 2 && amountevent === 3) {
      defaultAmount = 10000;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 3 && amountevent === 10) {
      defaultAmount = 10000;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 3 && amountevent === 1) {
      defaultAmount = 5000;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 3 && amountevent === 2) {
      defaultAmount = 12500;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 3 && amountevent === 3) {
      defaultAmount = 10000;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    }
  } else {
    if (amount === 10 && amountevent === 10) {
      defaultAmount = 500;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount == 10 && amountevent == 1) {
      defaultAmount = 300;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 10 && amountevent === 2) {
      defaultAmount = 680;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 10 && amountevent === 3) {
      defaultAmount = 300;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 1 && amountevent === 10) {
      defaultAmount = 625;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 1 && amountevent === 1) {
      defaultAmount = 375;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 1 && amountevent === 2) {
      defaultAmount = 850;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 1 && amountevent === 3) {
      defaultAmount = 300;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 2 && amountevent === 10) {
      defaultAmount = 250;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 2 && amountevent === 1) {
      defaultAmount = 150;
      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 2 && amountevent === 2) {
      defaultAmount = 340;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 2 && amountevent === 3) {
      defaultAmount = 300;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 3 && amountevent === 10) {
      defaultAmount = 312;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 3 && amountevent === 1) {
      defaultAmount = 187;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 3 && amountevent === 2) {
      defaultAmount = 425;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    } else if (amount === 3 && amountevent === 3) {
      defaultAmount = 300;

      console.log(`Setting amount and amountevent to ${defaultAmount}`);
    }
  }
  useEffect(() => {
    console.log(defaultAmount);
    localStorage.setItem("defaultAmount", defaultAmount);
  }, [amount, amountevent]);

  console.log(defaultAmount);

  const handleInputChange = (field, value) => {
    
    setFormData({
      ...formData,
      [field]: value,
    });
 
  
    if (field === "memberType") {
      setValue(null);
    }
   
  }
   

  useEffect(() => {
    console.log("jyhjyg-", value);
  }, [value]);
  console.log(amount)
  
  const handleInputChange1 = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    if (field === "registrationType") {
      setValue1(null);
      // Set amountevent based on the selected registration type
      const selectedOption = [
        { label: "Only Symposium Registration", value: 10 },
        { label: "Workshop + Short Courses Registration", value: 1 },
        { label: "Accompanying Person if any", value: 3 },
        { label: "Full Registration", value: 2 },
      ].find((option) => option.label === value);

      if (selectedOption) {
        setAmountEvet(selectedOption.value);
        console.log(amountevent);
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [book] = useState({
    name: "The Fault In Our Stars",
    author: "John Green",
    img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
    price: 250,
  });

  const handleCloseModal = () => {
    setModalOpen(false);
    closeModal();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    p: 4,
  };

  const handleAutocompleteChange = (event, newValue) => {
    if (newValue && Object.keys(newValue).length > 0) {
      console.log("hyfuyfu - ", newValue.label);
      setSelectedValue(newValue.label);
      setFormData({
        ...formData,
        country: newValue.label,
      });
    } else {
      setSelectedValue(null);
    }
  };
  useEffect(() => {
    // This effect will run when the component mounts and when openfail2 changes to true
    if (openfail2 && orderid) {
      handleSubmitpaypalfail();
    }
  }, [openfail2]);
  const createOrder = async () => {
    const storedDefaultAmount = localStorage.getItem("defaultAmount");
    const shouldDisableCheckbox = localStorage.getItem("isCheckboxDisabled");
    const click = localStorage.getItem("Checkbox")
    console.log("click",click)
    const currentDate = dayjs();
    console.log(currentDate)
const discountExpiryDate = dayjs('2024-05-31');

// Check if the current date is on or before May 31, 2024
const applyDiscount = currentDate <= discountExpiryDate;

let discountedAmount = parseInt(storedDefaultAmount);

if (applyDiscount) {
  // Apply a 10% discount
  discountedAmount = Math.round(discountedAmount * 0.9);
}

localStorage.setItem('discountedAmount', discountedAmount);
    const response = await payPalPayment({
      cost: discountedAmount,
      shouldDisableCheckbox:shouldDisableCheckbox,
      click:click

    });

    console.log("Response object:", response);

    const id = response.data?.jsonResponse?.id;

    if (id) {
      console.log("orderId:", id);
      setOrderid(id);
      return id;
    } else {
      console.error("Failed to retrieve orderId from the response object.");
      return null;
    }
  };

  console.log(orderid);

  const onApprove = async (orderId) => {
    try {
      // Assuming sendOrderId returns the necessary data
      const paymedantData = await sendOrderId(orderId);
      setPaymentData(defaultAmount);

      console.log(
        "hiiiiiiiiiiiiiiiiiiiiiii",
        paymedantData.data.jsonResponse.id
      );

      const captureId =
        paymedantData.data.jsonResponse.purchase_units[0].payments.captures[0]
          .id;
      console.log("iddddddddddd", captureId);
      handleSubmitpaypal(captureId);
      setOpen(true);
    } catch (error) {
      console.error("Error processing PayPal payment:", error);
      handleSubmitpaypalfail();
      setOpenfail2(true);
    }
  };

  const initPayment = (data) => {
    const options = {
      // key: "rzp_live_yhgIBqTwpGyP3Z",
      key: "rzp_test_StbZBonzDungvA",
      amount: data.amount,
      currency: data.currency,
      name: book.name,
      description:`${formData.name}${formData.email}`,
      image: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          setOrderid(options.order_id);
          const verifyUrl = `${RAZOR_BASE_PATH}/verify`;
          const { data: verificationData } = await axios.post(
            verifyUrl,
            response
          );
          console.log("Verification Data:", verificationData);

          if (verificationData.message === "Payment verified successfully") {
            // Call handleSubmit function if verification is successful
            await handleSubmit(options);
            setOpen2(true);
            // You may decide when to open the modal
          } else {
            // Handle the case where payment verification failed
            console.error("Payment verification failed");
            console.log("options", options);
            await handleSubmitFail(options);
            setOpenfail(true);
          }
        } catch (error) {
          console.log(error);
          console.log("options", options);
          await handleSubmitFail(options);
          // Handle network or server errors here
          setOpenfail(true);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (event) => {
    if (event) {
      event.preventDefault();
    }
    try {
      const storedDefaultAmount = localStorage.getItem("defaultAmount");
      const click = localStorage.getItem("Checkbox")
      const currentDate = dayjs();
      const discountExpiryDate = dayjs('2024-05-31');
  
      // Check if the current date is on or before May 31, 2024
      const applyDiscount = currentDate <= discountExpiryDate;
  
      let discountedAmount = parseInt(storedDefaultAmount);
  
      if (applyDiscount) {
        // Apply a 10% discount
        discountedAmount = Math.round(discountedAmount * 0.9);
      }
  
      localStorage.setItem('discountedAmount', discountedAmount);
      
      const orderUrl = `${RAZOR_BASE_PATH}/razorPayment`;
      const { data } = await axios.post(orderUrl, { amount: discountedAmount,setIsCheckboxDisabledbox: isCheckboxDisabled,check:click });
      console.log("hello", data);
      initPayment(data.data);

      //setOpen2(true);
    } catch (error) {
      console.log(error);
    }
  };

  const isFormValid = () => {
    // Add logic to check if all required fields are filled
    console.log(formData);
    return (
      formData.country &&
      formData.memberType &&
      formData.registrationType &&
      formData.name &&
      formData.email &&
      formData.organization &&
      formData.designation &&
      formData.address &&
      formData.postalCode &&
      formData.dob &&
      formData.dateOfExpiry &&
      formData.placeOfIssue 
    );
  };
  useEffect(() => {
    const storedFormData1 = localStorage.getItem("formData");
    const Checkbox = localStorage.getItem("Checkbox")
    setClickon(Checkbox === 'true'?true:false)
    if (storedFormData1) {
    
      const storedFormData = JSON.parse(storedFormData1);
      setFormData({
        ...storedFormData, 
        dob: dayjs(storedFormData.dob),
        dateOfIssue: dayjs(storedFormData.dateOfIssue),
        dateOfExpiry: dayjs(storedFormData.dateOfExpiry),
        dateOfArrival: dayjs(storedFormData.dateOfArrival),
        dateOfDeparture: dayjs(storedFormData.dateOfDeparture),
        memberType:"",
        registrationType:""
      });
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);
  const handleSubmit = async (options) => {
    const currentDate = dayjs();
    const click = localStorage.getItem("Checkbox")
    const discountExpiryDate = dayjs('2024-05-31');
    const applyDiscount = currentDate <= discountExpiryDate;
    let discountedAmount = defaultAmount;
  
    if (applyDiscount) {
      // Apply a 10% discount
      discountedAmount = Math.round(discountedAmount * 0.9);
    }
  
    const requestData = {
      ...formData,
      orderId: options.order_id,
      amount: discountedAmount,
      payment_type: "RazorPay",
      status: 1,
      setIsCheckboxDisabledbox: isCheckboxDisabled,
      click:click
    };

    try {
      // Make a POST request to the backend endpoint
      const response = await axios.post(
        `${ADD_BASE_PATH}/adddata`,
        requestData
      );

      // Handle the response from the backend
      console.log("Backend response:", response.data);
      
        localStorage.clear();
        window.location.reload(true);
    
      // You can add logic here to handle a successful response (e.g., show a success message)
    } catch (error) {
      // Handle errors (e.g., display an error message)

      console.error("Error submitting data to the backend:", error);
    }
  };

  const handleSubmitFail = async (options) => {
    const currentDate = dayjs();
    const discountExpiryDate = dayjs('2024-05-31');
    const applyDiscount = currentDate <= discountExpiryDate;
    let discountedAmount = defaultAmount;
  
    if (applyDiscount) {
      // Apply a 10% discount
      discountedAmount = Math.round(discountedAmount * 0.9);
    }
  
    const requestData = {
      ...formData,
      orderId: options.order_id,
      amount: discountedAmount,
      payment_type: "RazorPay",
      status: 0,
      setIsCheckboxDisabledbox: isCheckboxDisabled
    };

    try {
      // Make a POST request to the backend endpoint
      const response = await axios.post(
        `${ADD_BASE_PATH}/adddata`,
        requestData
      );

      // Handle the response from the backend
      console.log("Backend response:", response.data);
      localStorage.clear();
      window.location.reload(true);
      // You can add logic here to handle a successful response (e.g., show a success message)
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error("Error submitting data to the backend:", error);
    }
  };

  const handleSubmitpaypal = async (captureId) => {
    // Retrieve form data from localStorage
    const storedFormData = localStorage.getItem("formData");
    const parsedFormData = storedFormData ? JSON.parse(storedFormData) : {};
    const storedDefaultAmount = localStorage.getItem("defaultAmount");
    const shouldDisableCheckbox = localStorage.getItem("isCheckboxDisabled");
    const click = localStorage.getItem("Checkbox")
    const currentDate = dayjs();
    const discountExpiryDate = dayjs('2024-05-31');
    const applyDiscount = currentDate <= discountExpiryDate;
  
    let discountedAmount = parseInt(storedDefaultAmount);
  
    if (applyDiscount) {
      // Apply a 10% discount
      discountedAmount = Math.round(discountedAmount * 0.9);
    }
  
  
    // Create the request data by merging the stored form data with additional data
    const requestData = {
      ...parsedFormData,
      orderId: captureId,
      amount: discountedAmount,
      payment_type: "PayPal",
      status: 1,
      shouldDisableCheckbox:shouldDisableCheckbox,
      click:click

    };

    try {
      // Make a POST request to the backend endpoint
      const response = await axios.post(
        `${ADD_BASE_PATH}/adddata`,
        requestData
      );

      // Handle the response from the backend
      console.log("Backend response:", response.data);
      localStorage.clear();
        window.location.reload(true);
      // You can add logic here to handle a successful response (e.g., show a success message)
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error("Error submitting data to the backend:", error);
    }
  };
  const handleSubmitpaypalfail = async () => {
    // Check if orderId is not null
    if (orderid === null) {
      console.error("orderId is null. Skipping data submission.");
      return;
    } else {
      const storedFormData = localStorage.getItem("formData");
      const parsedFormData = storedFormData ? JSON.parse(storedFormData) : {};
      const storedDefaultAmount = localStorage.getItem("defaultAmount");
      const shouldDisableCheckbox = localStorage.getItem("isCheckboxDisabled");
      const currentDate = dayjs();
      const discountExpiryDate = dayjs('2024-05-31');
      const applyDiscount = currentDate <= discountExpiryDate;
    
      let discountedAmount = parseInt(storedDefaultAmount);
    
      if (applyDiscount) {
        // Apply a 10% discount
        discountedAmount = Math.round(discountedAmount * 0.9);
      }
    
      // Create the request data by merging the stored form data with additional data
      const requestData = {
        ...parsedFormData,
        orderId: orderid,
        amount: discountedAmount,
        payment_type: "PayPal",
        status: 0,
        shouldDisableCheckbox:shouldDisableCheckbox
      };

      try {
        // Make a POST request to the backend endpoint
        const response = await axios.post(
          `${ADD_BASE_PATH}/adddata`,
          requestData
        );

        // Handle the response from the backend
        console.log("Backend response:", response.data);
        localStorage.clear();
        window.location.reload(true);
        // You can add logic here to handle a successful response (e.g., show a success message)
      } catch (error) {
        // Handle errors (e.g., display an error message)
        console.error("Error submitting data to the backend:", error);
      }
    }

    // Retrieve form data from localStorage
  };
   console.log("isCheckboxDisabled",isCheckboxDisabled)
   useEffect(() => {
    // Your logic to determine whether the checkbox should be enabled or disabled
    const shouldDisableCheckbox = (amount === 2 || amount === 3);
  
    // Update the state accordingly
    setIsCheckboxDisabled(shouldDisableCheckbox);
  
    // Store isCheckboxDisabled in localStorage
    localStorage.setItem('isCheckboxDisabled', shouldDisableCheckbox);
  }, [amount]);
  
  const handleCheckboxChange = () => {
    // Your logic for checkbox change
    // For example, toggle the isChecked state
  
      // Additional logic based on checkbox state
      
        // Checkbox is checked
        setClickon(!clickon);
        localStorage.setItem('Checkbox', !clickon);
        console.log("Checkbox is checked");
        // Additional logic here if needed
    
  
      // Update localStorage with the current value of isChecked
     
  
      // Return the updated value
     
    
    
    // You can also perform other actions here based on checkbox state
  };
  console.log("formData.memberType",formData.memberType)
  return (
    <>
      <StyledContainer
        maxWidth="md"
        theme={theme}
        sx={{ backgroundColor: "#d0f4de" }}
      >
        <StyledPaper elevation={3} theme={theme}>
          <Typography variant="h4" align="center" gutterBottom>
            Registration Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={options}
                  sx={{ width: "flex" }}
                  onChange={handleAutocompleteChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Country" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={3.7}>
                <StyledFormControl fullWidth>
                  <RadioGroup
                   defaultValue=""
                    aria-label="Member Type"
                    name="memberType"
                    value={formData.memberType}
                    onChange={(e) =>
                      handleInputChange("memberType", e.target.value)
                    }
                  >
                    {[
                      { label: "Member", value: 10 },
                      { label: "Non-Member", value: 1 },
                      { label: "Member-Student", value: 2 },
                      { label: "Non-Member Student", value: 3 },
                      
                    ].map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.label}
                        control={<Radio />}
                        label={option.label}
                        onChange={() => setAmount(option.value)}
                      />
                    ))}
                  </RadioGroup>
                 
                </StyledFormControl>
              </Grid>

              <Grid item xs={12} md={4.3}>
                <StyledFormControl fullWidth>
                  <RadioGroup
                    aria-label="Registration Type"
                    name="registrationType"
                    value={formData.registrationType}
                    onChange={(e) =>
                      handleInputChange1("registrationType", e.target.value)
                    }
                  >
                    {[
                      { label: "Only Symposium Registration", value: 10 },
                      {
                        label: "Workshop + Short Courses Registration",
                        value: 1,
                      },
                      { label: "Full Registration", value: 2 },
                      { label: "Accompanying Person if any", value: 3 },
                    ].map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.label}
                        control={<Radio />}
                        label={option.label}
                        onChange={() => {
                          handleInputChange1("registrationType", option.label);
                          setAmountEvet(option.value);
                        }}
                      />
                    ))}
                  </RadioGroup>
                 
                </StyledFormControl>
               
              </Grid>
              <FormControlLabel
                sx={{marginLeft:'58%'}}
      control={<Checkbox checked={clickon} disabled={isCheckboxDisabled} />}
      label="Retired Person"

      onChange={handleCheckboxChange}
    />
              
              <Grid item xs={12} md={4}>
                <StyledFormControl fullWidth>
                  <TextField
                    label="Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </StyledFormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <StyledFormControl fullWidth>
                  <TextField
                    label="Email"
                    variant="outlined"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </StyledFormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <StyledFormControl fullWidth>
                  <TextField
                    label="Organization"
                    variant="outlined"
                    value={formData.organization}
                    onChange={(e) =>
                      handleInputChange("organization", e.target.value)
                    }
                  />
                </StyledFormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <StyledFormControl fullWidth>
                  <TextField
                    label="Designation"
                    variant="outlined"
                    value={formData.designation}
                    onChange={(e) =>
                      handleInputChange("designation", e.target.value)
                    }
                  />
                </StyledFormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <StyledFormControl fullWidth>
                  <TextField
                    label="Address for Correspondence"
                    variant="outlined"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                </StyledFormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <StyledFormControl fullWidth>
                  <TextField
                    label="Postal Code"
                    variant="outlined"
                    value={formData.postalCode}
                    onChange={(e) =>
                      handleInputChange("postalCode", e.target.value)
                    }
                  />
                </StyledFormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
               
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
              
                    <DatePicker
                      value={formData.dob}
                      onChange={(date) => handleInputChange("dob", date)}
                      format="DD-MM-YYYY" // Specify the desired format
                      slotProps={{
                        
                        textField: {
                          label:"Date Of Birth",
                          name: "dob",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <StyledFormControl fullWidth>
                  <TextField
                    label="Passport No"
                    variant="outlined"
                    value={formData.passportNo}
                    onChange={(e) =>
                      handleInputChange("passportNo", e.target.value)
                    }
                  />
                </StyledFormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      placeholder="Date of Issue"
                      format="YYYY-MM-DD"
                      value={formData.dateOfIssue} // Set the value prop
                      onChange={(date) =>
                        handleInputChange("dateOfIssue", date)
                      } // Update the state on change
                      slotProps={{
                        textField: {
                          label:"Date Of Issue",
                          name: "dateOfIssue", // Ensure the correct field name is used
                        },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
       
                    <DatePicker
                      placeholder="Date of Expiry"
                      format="YYYY-MM-DD"
                      value={formData.dateOfExpiry} // Set the value prop
                      onChange={(date) =>
                        handleInputChange("dateOfExpiry", date)
                      } // Update the state on change
                      slotProps={{
                        textField: {
                          label:"Date of Expiry",
                          name: "dateOfExpiry", // Ensure the correct field name is used
                        },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <StyledFormControl fullWidth>
                  <TextField
                    label="Place of Issue"
                    variant="outlined"
                    value={formData.placeOfIssue}
                    onChange={(e) =>
                      handleInputChange("placeOfIssue", e.target.value)
                    }
                  />
                </StyledFormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                  
                      <DatePicker
                        placeholder="Date of Arrival"
                        format="YYYY-MM-DD"
                        value={formData.dateOfArrival} // Set the value prop
                        onChange={(date) =>
                          handleInputChange("dateOfArrival", date)
                        } // Update the state on change
                        slotProps={{
                          textField: {
                            label:"Date of Arrival",
                            name: "dateOfArrival", // Ensure the correct field name is used
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
              
                    <DatePicker
                      placeholder="Date of Departure"
                      format="YYYY-MM-DD"
                      value={formData.dateOfDeparture} // Set the value prop
                      onChange={(date) =>
                        handleInputChange("dateOfDeparture", date)
                      } // Update the state on change
                      slotProps={{
                        textField: {
                          label:"      Date of Departure:",
                          name: "dateOfDeparture", // Ensure the correct field name is used
                        },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>

            <Grid style={{ marginTop: "20px" }}>
              {selectedValue === "India" ? (
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  onClick={handlePayment}
                  color="success"
                  disabled={!isFormValid()}
                >
                  Proceed With Razorpay
                </Button>
              ) : (
                <PayPalButtons
                  style={{ marginTop: "30px" }}
                  createOrder={(data, actions) => createOrder(data, actions)}
                  onApprove={(data, actions) => onApprove(data, actions)}
                  disabled={!isFormValid()}
                />
              )}
            </Grid>
          </form>
        </StyledPaper>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <VerifiedIcon sx={{ color: "green", width: 200, height: 100 }} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <h3>PayPal Transaction Successful</h3>
            </Typography>
          
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <b>Transaction Id</b> - {orderid}
            </Typography>
          </Box>
        </Modal>
        <Modal
          open={openfail2}
          onClose={handleClosefail2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CancelIcon sx={{ color: "red", width: 200, height: 100 }} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <h3>PayPal Transaction Transaction Fail!!!</h3>
            </Typography>
            
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <b>Transaction Id</b> - {orderid}
            </Typography>
          </Box>
        </Modal>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <VerifiedIcon sx={{ color: "green", width: 200, height: 100 }} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <h3>Razorpay Transaction Successful</h3>
            </Typography>
           
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <b>Transaction Id</b> - {orderid}
            </Typography>
          </Box>
        </Modal>
        <Modal
          open={openfail}
          onClose={handleClosefail}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CancelIcon sx={{ color: "red", width: 200, height: 100 }} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <h3>Razorpay Transaction Fail!!!</h3>
            </Typography>
           
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <b>Transaction Id</b> - {orderid}
            </Typography>
          </Box>
        </Modal>
      </StyledContainer>
    </>
  );
}

export default Papel;
