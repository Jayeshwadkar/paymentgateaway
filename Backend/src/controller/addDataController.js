const pool = require("../config/dbConfig.js");
const jwt=require('jsonwebtoken')
const util = require('util');
const dayjs = require('dayjs');
const Login = async (req, res) => {
    const { username, password } = req.body;
  console.log(req.body)
    // Set the hardcoded username and password
    const hardcodedUsername = 'admin';
    const hardcodedPassword = '123';
  
    if (username == hardcodedUsername && password == hardcodedPassword) {
      const userType = 'admin'; // Set the user type
      const token = jwt.sign({userType }, 'jwt-secret-key', {
        expiresIn: '1d'
      });
      console.log(token)
      res.cookie('token', token); // 1 day
  
      return res.status(200).json({ status: 'Success', token,});
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  };
  
const addData = async (req, res) => {
    console.log("Request Body:", req.body);
    let amount = req.body.amount;
    
    // Check if shouldDisableCheckbox is false, then apply a 25% discount on the amount
    if (req.body.shouldDisableCheckbox === 'false' || req.body.setIsCheckboxDisabledbox === false) {
      if(req.body.click === 'true'){
        amount = Math.round(amount * 0.75); // Apply a 25% discount
        console.log("cost", amount);
      }
      
    }

    try {
        const {
            country,
            memberType,
            registrationType,
            name,
            email,
            organization,
            designation,
            address,
            postalCode,
            dob,
            passportNo,
            dateOfIssue,
            dateOfExpiry,
            placeOfIssue,
            dateOfArrival,
            dateOfDeparture,
            orderId,
            payment_type,
            status
        } = req.body;

        // Convert date strings to the desired format using dayjs
        const formattedDob = dayjs(dob).format('YYYY-MM-DD');
        const formattedDateOfIssue = dayjs(dateOfIssue).format('YYYY-MM-DD');
        const formattedDateOfExpiry = dayjs(dateOfExpiry).format('YYYY-MM-DD');
        const formattedDateOfArrival = dayjs(dateOfArrival).format('YYYY-MM-DD');
        const formattedDateOfDeparture = dayjs(dateOfDeparture).format('YYYY-MM-DD');

        const query = `
            INSERT INTO payment_details (
                country,
                member_type,
                events,
                name,
                email,
                organization,
                designation,
                address,
                postal_code,
                date_of_birth,
                passport_no,
                date_of_issue,
                date_of_expiry,
                place_of_issue,
                date_of_arrival,
                date_of_departure,
                amount,
                transection_id,
                payment_type,
                status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
        `;

        

        const result = await pool.query(query, [
            country,
            memberType,
            registrationType,
            name,
            email,
            organization,
            designation,
            address,
            postalCode,
            formattedDob,
            passportNo,
            formattedDateOfIssue,
            formattedDateOfExpiry,
            placeOfIssue,
            formattedDateOfArrival,
            formattedDateOfDeparture,
            amount,
            orderId,
            payment_type,
            status
        ]);

       
        res.send({message:"Data Add Successfully"})
        
    } catch (error) {
        console.error("Error adding data:", error.message);
        res.status(500).send("Internal Server Error");
    }
};





const getAllData = async (req, res) => {
  const q = "SELECT * FROM payment_details";

  pool.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    const processedData = data.map((row) => {
      return {
        id: row.id,
        country: row.country,
        member_type: row.member_type,
        events:row.events, 
        name:row.name,
        email:row.email, 
        organization:row.organization,
        designation:row.designation,
        address:row.address,
        postal_code:row.postal_code,
        date_of_birth:row.date_of_birth, 
        passport_no:row.passport_no, 
        date_of_issue:row.date_of_issue, 
        date_of_expiry:row.date_of_expiry, 
        place_of_issue:row.place_of_issue,
        date_of_arrival:row.date_of_arrival,
        date_of_departure:row.date_of_departure, 
        amount:row.amount,
        transection_id:row.transection_id,
        payment_type:row.payment_type, 
        status: row.status === '1' ? 'Success' : 'Fail'
      };
    });

    console.log(processedData);

    return res.json(processedData);
  });
};


  
module.exports={
    addData,
    getAllData,
    Login
}