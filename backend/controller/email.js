require('dotenv').config();
const nodemailer = require('nodemailer');



const email = (req, res, next) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const tr = (el) => {
        var tag = ""
        for (x in el) {
            tag += `<tr style="text-align:center">
                <th scope="row">${el[x].name}</th>
                <td>${el[x].offre !== 0 ? el[x].offre : el[x].price}$</td>
                <td>${el[x].qty}</td>
                <td>${ el[x].offre !== 0 ? el[x].qty * el[x].offre :el[x].qty * el[x].price}$</td>
            </tr>`
        }
        return tag
    }
    const html = (name, phone, adress, city, zip, email, total, tag) => {
        return `
        <div style="
            width:80%;
            background: rgba(223, 223, 223, 0.395);
            padding:15px;
            border-radius:10px;
            color:black;
            font-size:12px;
            box-shadow:5px 3px 2px rgba(0,0,0,0.8);
            border:1px solid black;
            letter-spacing: 1px;
            word-spacing: 1px;
        ">
            <div>
                <table style="width:50%">
                    <tr>
                        <td>Name</td>
                        <td>${name}</td>
                     </tr>
                    <tr>
                        <td>Phone</td>
                        <td>${phone}</td>
                    </tr>
                    <tr>
                        <td>Adress</td>
                        <td>${adress}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>${city}</td>
                    </tr>
                    <tr>
                        <td>Zip</td>
                        <td>${zip}</td>
                    </tr <tr>
                    <td>Email</td>
                    <td style="text-decoration: none ">${email}</td>
                    </tr </table>
                    <br>
            </div>
            <div>
                <div>
                    <table width="100%">
                        <tr>
                            <th scope="col"> Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Price</th>
                        </tr>
        
                        <tr style="text-align:center;">
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
        
                        ${tr(tag)}
        
                        <tr style="text-align:center;">
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                            <td>----------------------------</td>
                                
                           
                        </tr>

                        <tr style="text-align:center;">
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                            <td>TAX: ${(total * 5 / 100).toFixed(2)}$</td>
                        </tr>
 
                        <tr style="text-align:center;">
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                            <td> SHIPING: 2$</td>
                        </tr>
                        <tr style="text-align:center;">
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                            <td>TOTAL: ${(total + total * 5 / 100 + 2).toFixed(2)}$</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div style="
                margin-top:20px;
                text-align:center;
                letter-spacing: 5px;
                 ">
                &copy; Avrnikh - ${new Date().getFullYear()}
            </div>
        </div>
    `
    }
    if (req.body.name) {
        if (req.body.email) {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
                if (req.body.phone) {
                    if (/(\+212|0)(6|7)([ \-_/]*)(\d[ \-_/]*){8}/.test(req.body.phone)) {
                        if (req.body.adress) {
                            if (req.body.adress.length > 10) {
                                if (req.body.city) {
                                    if (req.body.zip) {
                                        if (req.body.cart) {
                                            var tot = 0;
                                            var ta = req.body.cart
                                            for (x in ta) {
                                                if (ta[x].offre !== 0) {
                                                    tot += ta[x].qty * ta[x].offre;
                                                } else {
                                                    tot += ta[x].qty * ta[x].price;
                                                }
                                            }
                                            transporter.sendMail({
                                                from: process.env.EMAIL,
                                                to: `aavrnikh@gmail.com ; ${req.body.email}`,
                                                subject: "Avrnikh servece",
                                                html:
                                                    html(
                                                        req.body.name,
                                                        req.body.phone,
                                                        req.body.adress,
                                                        req.body.city,
                                                        req.body.zip,
                                                        req.body.email,
                                                        tot,
                                                        ta
                                                    )    

                                            }, (err, data) => {
                                                if (err) res.json({ success: { err: "faild to send your request , try again" } })
                                                else res.json({ success: { success: "tank you , we welle contact you soon " } })
                                            })
                                        } else res.json({ errs: { cart: "faild to send request , try again " } })
                                    } else res.json({ errs: { zip: " zip is required" } })
                                } else res.json({ errs: { city: "city is required" } })
                            } else res.json({ errs: { adress: "adress to short" } })
                        } else res.json({ errs: { adress: "adress is required" } })
                    } else res.json({ errs: { phone: "invalid phone number" } })
                } else res.json({ errs: { phone: "phone is required" } })
            } else res.json({ errs: { email: "invalid email" } })
        } else res.json({ errs: { email: "email is required" } })
    } else res.json({ errs: { name: "name is required" } })
}

module.exports = { email };




























/* /* var name = req.body.name;
    var Email = req.body.email;
    const tag = req.body.cart;

    var t = "";
    var total = 0;
    const tg = () => {
        for (x in tag) {
            total += tag[x].qty * tag[x].price;

            t += `<tr  style="text-align:center;">
                <th scope="row">${tag[x].name}</th>
                <td>${tag[x].price}$</td>
                <td>${tag[x].qty}</td>
                <td>${tag[x].qty * tag[x].price}$</td>
                </tr>
            `
        }
        return t
    }

    const result = () => `
    <div style="border:1px solid white">
    <table width="100%">
    <tr>
        <th scope="col"> Product</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
        <th scope="col">Total Price</th>
    </tr>

    <tr  style="text-align:center;">
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    ${tg()}
    </tr>
        <tr  style="text-align:center;">
        <th scope="row"></th>
        <td></td>
        <td></td>
    <td>______________</td>
    </tr>
    <tr  style="text-align:center;">
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td>Total: ${total}$</td>
    </tr>
    </table>
    </div>
`*/