import productModel from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js';
import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';
import bcrypt from 'bcrypt'


//                        ********** WELCOME MESSAGE ****************


// export const firstMessageController = async (req, res) => {
//         // Log the request body for debugging purposes
//         console.log('Received request:', req.body);
  
//         // Create a response message
//         const responseMessage = 'Hi, Welcome to our E-store virtual assistant.';
      
//         // Create the JSON response structure required by Dialogflow CX
//         const jsonResponse = {
//           fulfillmentResponse: {
//             messages: [
//               {
//                 text: {
//                   text: [responseMessage],
//                 }
//               }
//             ]
//           }
//         };
      
//         // Send the response back to Dialogflow CX
//         res.json(jsonResponse);

// }

// http://localhost:3000/api/v1/product/product-photo/66111b21d00eb2276b234d71
//        ************  Show   Images    **************



export const showImageController = async(req, res) => {
    try {
          
     // console.log(req.body)

      let slug
      let quantity


      if( req?.body?.sessionInfo?.parameters?.category == 'gents watch'){
        slug = 'gents-watch',
        quantity= (req?.body?.sessionInfo?.parameters?.watchtype == 'digital watch') ? 2 : 1
      }
      else if( req?.body?.sessionInfo?.parameters?.category == 'ladies watch'){
        slug = 'ladies-watch',
        quantity= (req?.body?.sessionInfo?.parameters?.watchtype == 'digital watch') ? 2 : 1
      }
      else if( req?.body?.sessionInfo?.parameters?.category == 'wall clock'){
        slug = 'wall-clock',
        quantity= (req?.body?.sessionInfo?.parameters?.clocktype == 'digital clock') ? 2 : 1
      }
      else if( req?.body?.sessionInfo?.parameters?.category == 'alarm clock'){
        slug = 'alarm-clock',
        quantity= (req?.body?.sessionInfo?.parameters?.clocktype == 'digital clock') ? 2 : 1
      }

        console.log('Here is slug:',slug)
        console.log('Here is quantity:',quantity)

        const category = await categoryModel.findOne({slug})
        const products = await productModel.find({category, quantity:quantity}).select('-photo').populate('category')

        
        // Log the request body for debugging purposes
          
          
      
        // Create a response message
      
        // Create the JSON response structure required by Dialogflow CX


        const jsonResponse = {
            fulfillment_response: {
                messages: [
                  {
                    payload: {
                        "richContent":products.map(p => ([
                            {
                              type: "image",
                              rawUrl: `https://back-433107.uc.r.appspot.com/api/v1/product/product-photo/${p._id}`,
                              accessibilityText: p.category.name,
                              reference: {
                                anchor: {
                                  href: `https://www.estoreapp.online/product/${p.slug}`
                                }
                              }
                            },
                            {
                              type: "info",
                              title:`Price: $${p.price}`,
                              subtitle:p.name ,
                              anchor: {
                                href: "https://example.com/images/logo.png"
                              }
                            }
                          ]))
                      }
                  }
                ]
              }
          }
        
          // Send the response back to Dialogflow CX
          res.json(jsonResponse);
        
    } catch (error) {
        console.log(error);
    }
    
      
}


export const showOrderStatus = async(req, res) => {
  try {

      const user = await userModel.findOne({ email:req?.body?.sessionInfo?.parameters?.email });

      if (!user) {
        // User not found
        const jsonResponse = {
          fulfillment_response: {
              messages: [
                {
                  payload: {
                      "richContent":[
                        [
                          {
                            "type": "html",
                            "html": "<b>Your email or password may not correct</b>"
                          },
                          {
                            "type": "html",
                            "html": '<b>Press "restart" to try again!</b>'
                          }
                        ]
                      ]
                    }
                }
              ]
            }
        };
        return res.json(jsonResponse);
      }


      const passwordMatch = await bcrypt.compare(req?.body?.sessionInfo?.parameters?.password, user.password);


      if (!passwordMatch) {
        // Password does not match
        const jsonResponse = {
          fulfillment_response: {
              messages: [
                {
                  payload: {
                      "richContent":[
                        [
                          {
                            "type": "html",
                            "html": "<b>Your email or Password may not correct.</b>"
                          },
                          {
                            "type": "html",
                            "html": '<b>Press "restart" to try again!</b>'
                          }
                        ]
                      ]
                    }
                }
              ]
            }
        };
        return res.json(jsonResponse);
      }


      const orders = await orderModel.find({ buyer: user._id }).populate('product', '-photo').populate('buyer');

       const allOrders = orders?.map((o, i) => {
        const productInfo = o.product?.map(p => ({
          "type": "accordion",
          "title": `Price: $${p.price}`,
          "subtitle": `${p.name}`,
          "image": {
            "rawUrl": `https://back-433107.uc.r.appspot.com/api/v1/product/product-photo/${p._id}`
          },
          "text": `${p.description}`
        })) || [];
      
        return [
          {
            "type": "info",
            "title": `Order: ${i + 1}`,
          },
          {
            "type": "description",
            "title": `Order ID: ${o._id}`,
            "text": [
              `Buyer Name: ${o.buyer.name}`,
              `Order Status: ${o.status}`
            ]
          },
          ...productInfo
        ];
      });



      let richContent = [
        [
          {
            "type": "html",
            "html": `<b>Authentication is successful!</b>`
          }
        ],
        [
          {
            "type": "html",
            "html": `<b>${orders.length < 1 ? 'You have not placed any orders yet!' : 'Total Orders: ' + orders.length}</b>`
          }
        ],
        ...allOrders,
      ];


      let chips = [
        {
          "type": "chips",
          "options": [
            {
              "text": "Cancel Order"
            }
          ]
        }
      ];

      if (orders.length > 0) {
        richContent.push(chips);
      }


 

       const jsonResponse = {
        fulfillment_response: {
            messages: [
              {
                payload: {
                    "richContent": richContent
                  }
              }
            ]
          }
      }
    
      // Send the response back to Dialogflow CX
      res.json(jsonResponse);

  } catch (error) {
      console.log(error)
      const responseMessage = 'There is some error in processing'
      const jsonResponse = {
                  fulfillmentResponse: {
                    messages: [
                      {
                        text: {
                          text: [responseMessage]
                        }
                      }
                    ]
                  }
                };
              
                // Send the response back to Dialogflow CX
                res.json(jsonResponse);
        
      // res.status(500).send({
      //     success: false,
      //     message: 'Error in getting orders',error
      // })
  }
}



export const cancelOrderController = async(req, res) => {
  try {
  const user = await userModel.findOne({email: req?.body?.sessionInfo?.parameters?.email});
  const passwordMatch = await bcrypt.compare(req?.body?.sessionInfo?.parameters?.password, user.password);
  const orders = await orderModel.find({ _id: req?.body?.sessionInfo?.parameters?.id, buyer: user }).populate('buyer');
  const order = orders[0];
  if ( (passwordMatch && orders.length) && order.status == "Not_Process") {
    await orderModel.deleteOne({ _id: req?.body?.sessionInfo?.parameters?.id });
    const jsonResponse = {
      fulfillment_response: {
          messages: [    
            {
              payload: {
                  "richContent":[
                    [
                      {
                        "type": "html",
                        "html": "<b>Order cancelled successfully!</b>"
                      }
                    ],
                    [
                      {
                        "type": "chips",
                        "options": [
                          {
                            "text": "Restart"
                          }
                        ]
                      }
                    ],
                    [
                      {
                        "type": "chips",
                        "options": [
                          {
                            "text": "End"
                          }
                        ]
                      }
                    ]
                  ]
                }
            }
          ]
        }
    };
    return res.json(jsonResponse);

  }else if((passwordMatch && orders.length>0) && order.status !== 'Not_Process'){
    const jsonResponse = {
      fulfillment_response: {
          messages: [
            {
              payload: {
                  "richContent":[
                    [
                      {
                        "type": "html",
                        "html": `<b>You can't cancel this order as it's already ${order.status}!</b>`
                      }
                    ],
                    [
                      {
                        "type": "chips",
                        "options": [
                          {
                            "text": "Restart"
                          }
                        ]
                      }
                    ],
                    [
                      {
                        "type": "chips",
                        "options": [
                          {
                            "text": "End"
                          }
                        ]
                      }
                    ]
                  ]
                }
            }
          ]
        }
    };
    return res.json(jsonResponse);
  }else if(passwordMatch && orders.length < 1){
    const jsonResponse = {
      fulfillment_response: {
          messages: [
            {
              payload: {
                  "richContent":[
                    [
                      {
                        "type": "html",
                        "html": "<b>You don't have any orders to cancel!</b>"
                      }
                    ],
                    [
                      {
                        "type": "chips",
                        "options": [
                          {
                            "text": "Restart"
                          }
                        ]
                      }
                    ],
                    [
                      {
                        "type": "chips",
                        "options": [
                          {
                            "text": "End"
                          }
                        ]
                      }
                    ]
                  ]
                }
            }
          ]
        }
    };
    return res.json(jsonResponse);
  }else{
    const jsonResponse = {
      fulfillment_response: {
          messages: [
            {
              payload: {
                  "richContent":[
                    [
                      {
                        "type": "html",
                        "html": "<b>Error! Order not canceled.</b>"
                      }
                    ],
                    [
                      {
                        "type": "chips",
                        "options": [
                          {
                            "text": "Restart"
                          }
                        ]
                      }
                    ],
                    [
                      {
                        "type": "chips",
                        "options": [
                          {
                            "text": "End"
                          }
                        ]
                      }
                    ]
                  ]
                }
            }
          ]
        }
    };
    return res.json(jsonResponse);
  }
} catch (error) {
  const jsonResponse = {
    fulfillment_response: {
        messages: [
          {
            payload: {
                "richContent":[
                  [
                    {
                      "type": "html",
                      "html": "<b>Error in processing! Order not canceled.</b>"
                    }
                  ],
                  [
                    {
                      "type": "chips",
                      "options": [
                        {
                          "text": "Restart"
                        }
                      ]
                    }
                  ],
                  [
                    {
                      "type": "chips",
                      "options": [
                        {
                          "text": "End"
                        }
                      ]
                    }
                  ]
                ]
              }
          }
        ]
      }
  };
  return res.json(jsonResponse);
    
}
}






                       //   {
                        //     type: "carousel",
                        //     rawUrl: 'http://localhost:3000/api/v1/product/product-photo/66a0b7fff1d478e79322fabc',
                        //     accessibilityText: "Company Logo"
                        //   }



// Hi, Welcome to our E-store virtual assistant. 
// You may also visit our E-store

// {
//     "richContent": [
//       [
//         {
//           "type": "chips",
//           "options": [
//             {
//               "text": "Sign in",
//               "anchor": {
//                 "href": "https://example.com"
//               }
//             },
//             {
//               "text": "Create account",
//               "anchor": {
//                 "href": "https://example.com"
//               }
//             }
//           ]
//         }
//       ]
//     ]
//   }



//   How we can assist you?

//   {
//     "richContent": [
//       [
//         {
//           "options": [
//             {
//               "text": "Show Catalog"
//             },
//             {
//               "text": "Cancel Order"
//             },
//             {
//               "text": "Customer Care"
//             },
//             {
//               "text": "Order Status"
//             }
//           ],
//           "type": "chips"
//         }
//       ]
//     ]
//   }











// const jsonResponse = {
//     fulfillment_response: {
//         messages: [
//           {
//             payload: {
//                 "richContent": [
//                     [
//                         {
//                             "type": "image",
//                             "rawUrl": "http://localhost:3000/api/v1/product/product-photo/66a0b6ecf1d478e79322fa99",
//                             "accessibilityText": "Dialogflow across platforms",
//                             "reference": {
//                                 "anchor": {
//                                   "href": "https://example.com/images/logo.png"
//                                 }
//                             }
//                           },
//                           {
//                             "type": "info",
//                             "title": "Gents watch",
//                             "subtitle": "Price: $100",
//                             "anchor": {
//                               "href": "https://cloud.google.com/dialogflow/docs"
//                             }
//                           }
                        

//                     ]
//                 ]
//               }
//           }
//         ]
//       }
//   }

//   // Send the response back to Dialogflow CX
//   res.json(jsonResponse);