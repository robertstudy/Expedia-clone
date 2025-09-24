import React, { useState } from 'react'
import { Box, Button, HStack, Heading, Icon, Image, Input, SimpleGrid, Text, Alert, AlertIcon, AlertTitle, AlertDescription, VStack } from '@chakra-ui/react'


import {TbBed} from 'react-icons/tb'
import {BsCheck} from 'react-icons/bs'
import {IoIosMan} from 'react-icons/io'
import {AiOutlineWifi} from 'react-icons/ai'

const CheckoutPage = () => {
  const [isBookingCompleted, setIsBookingCompleted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    mobile: '',
    nameOnCard: '',
    cardNumber: '',
    securityCode: '',
    textAlerts: false,
    textAlertsPayment: false
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCompleteBooking = () => {
    // Clear all form data
    setFormData({
      firstName: '',
      surname: '',
      mobile: '',
      nameOnCard: '',
      cardNumber: '',
      securityCode: '',
      textAlerts: false,
      textAlertsPayment: false
    })
    
    // Show success message
    setIsBookingCompleted(true)
    
    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      setIsBookingCompleted(false)
    }, 5000)
  }

  if (isBookingCompleted) {
    return (
      <Box bg={'gray.300'} width={'100%'} height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <VStack spacing={6} maxWidth={'600px'} width={'90%'}>
          <Alert status="success" borderRadius={'lg'} p={8}>
            <AlertIcon boxSize={'40px'} mr={4} />
            <Box>
              <AlertTitle fontSize={'2xl'} mb={2}>Booking Confirmed!</AlertTitle>
              <AlertDescription fontSize={'lg'}>
                Your reservation has been successfully completed. You will receive a confirmation email shortly with all the booking details.
              </AlertDescription>
            </Box>
          </Alert>
          
          <Box bg={'white'} p={6} borderRadius={'lg'} width={'100%'} textAlign={'center'}>
            <Heading fontSize={'xl'} mb={4} color={'green.600'}>Booking Details</Heading>
            <Text mb={2}><strong>Booking ID:</strong> EXP-{Date.now()}</Text>
            <Text mb={2}><strong>Total Amount:</strong> $11,210.00</Text>
            <Text mb={2}><strong>Payment:</strong> Pay at property</Text>
            <Text fontSize={'sm'} color={'gray.600'} mt={4}>
              Thank you for choosing Expedia! Have a wonderful stay.
            </Text>
          </Box>
          
          <Button 
            colorScheme={'blue'} 
            size={'lg'} 
            onClick={() => setIsBookingCompleted(false)}
          >
            Book Another Stay
          </Button>
        </VStack>
      </Box>
    )
  }

  return (

      <Box bg={'gray.300'} width={'100%'} height={'1000px'} >

        <Box width={'85%'} margin={'auto'} >
          <Heading fontSize={'26px'} fontWeight={'bold'} textAlign={'left'} >Review and Book</Heading>

          <Box bg={'white'} mt={2} p={3} >
            <HStack>
              <Box>
                <Image src='https://i.postimg.cc/mZmMdvzw/Screenshot-2023-04-01-130744.png' alt='image' />
              </Box>
              <Box>
                <Text textAlign={'left'} fontWeight={'bold'} >
                  Fully refundable before Sat, 8 Apr, 18:00 (property local time)
                </Text>
                <Text>
                You can change or cancel this stay if plans change. Because flexibility matters.
                </Text>
              </Box>
            </HStack>
          </Box>

          <SimpleGrid mt={2} gridTemplateColumns={'63% 35%'} gap={"1%"} >
            <Box bg={'white'} p={3}  >
              <Heading textAlign={'left'} fontSize={'20px'} fontWeight={'bold'}  >Whos Checking</Heading>
              <Heading textAlign={'left'} mt={3} fontWeight={'semibold'} >Room 1 : 2 Adult 2 twin bed non smoking</Heading>
              <Box  >
                <Box textAlign={'left'} my={2} >
                  <label  >
                    First Name : <Input 
                      type='text' 
                      placeholder='First Name' 
                      border='1px solid gray'
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </label>
                </Box>
                <Box textAlign={'left'} my={2} >
                  <label>
                    Surname Name : <Input  
                      type='text' 
                      placeholder='Surname' 
                      border='1px solid gray'
                      value={formData.surname}
                      onChange={(e) => handleInputChange('surname', e.target.value)}
                    />
                  </label>
                </Box>
                <Box textAlign={'left'} my={2} >
                  <label>
                    Mobile No : <Input 
                      type='text' 
                      placeholder='Mobile No' 
                      border='1px solid gray'
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                    />
                  </label>
                </Box>
                </Box>


              <Box textAlign={'left'} display={'flex'} >
                <Input 
                  type='checkbox'
                  isChecked={formData.textAlerts}
                  onChange={(e) => handleInputChange('textAlerts', e.target.checked)}
                />
                <Heading ml={2} >Receive text alerts about this trip (free of charge).</Heading>
              </Box>

            </Box>

            <Box bg={'white'} textAlign={'left'} p={2} >
              <Image mb={1} width={'100%'} src='https://images.trvl-media.com/lodging/4000000/3450000/3447500/3447485/4c0514cb_l.jpg' />
              <Heading fontSize={'13px'} >8.8/10 Excellent (820 reviews)</Heading>
              <Heading fontSize={'13px'}>Guests rated this property 9/10 for cleanliness</Heading>
              <Heading fontSize={'13px'}>1 Room: Room, 2 Twin Beds, Non Smoking, City View</Heading>
            
              <SimpleGrid gridTemplateColumns={'repeat(2,1fr)'} mt={3} mb={5} >
                <Box><Icon as={TbBed} fontSize={'18px'} />  2 Twins Bed</Box>
                <Box><Icon as={IoIosMan} fontSize={'18px'} />   Sleeps 3</Box>
                <Box><Icon as={AiOutlineWifi} fontSize={'18px'} />  Free WiFi</Box>
                <Box><Icon as={BsCheck} fontSize={'18px'} />  Free parking</Box>
              </SimpleGrid>
            </Box>
          </SimpleGrid>

          <SimpleGrid mt={2} gridTemplateColumns={'63% 35%'} gap={"1%"} >
            <Box bg={'white'} p={3}  >
              <Heading textAlign={'left'} fontSize={'20px'} fontWeight={'bold'}  >Payment Method</Heading>
              <Heading textAlign={'left'} mt={3} fontWeight={'semibold'} >₹0.00 due now. Payment information is only needed to hold your reservation.</Heading>
              
              <Box display={'flex'} gap={'6px'} >
                <Image height={'30px'} width={'30px'}  src='https://a.travel-assets.com/dms-svg/payments/cards-cc_american_express.svg' alt='image' />
                <Image height={'30px'} width={'30px'}   src='https://a.travel-assets.com/dms-svg/payments/cards-cc_master_card.svg' alt='image' />
                <Image height={'30px'} width={'30px'}  src='https://a.travel-assets.com/egds/marks/payment__visa.svg' alt='image' />
                <Image  height={'30px'} width={'30px'} src='https://a.travel-assets.com/dms-svg/payments/cards-cc_visa_electron.svg' alt='image' />
              </Box>
              <Box>
                <Box textAlign={'left'} my={2} >
                  <label  >
                    <b>Name on Card</b> : <Input 
                      type='text' 
                      placeholder='Name on Card' 
                      border='1px solid gray'
                      value={formData.nameOnCard}
                      onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                    />
                  </label>
                </Box>
                <Box textAlign={'left'} my={2} >
                  <label>
                    <b>Debit/Credit card number : </b> <Input  
                      type='text' 
                      placeholder='Card Number' 
                      border='1px solid gray'
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    />
                  </label>
                </Box>
                <Box textAlign={'left'} my={2} >
                  <label>
                    <b>Security code :</b> <Input 
                      type='text' 
                      placeholder='CVV' 
                      border='1px solid gray'
                      value={formData.securityCode}
                      onChange={(e) => handleInputChange('securityCode', e.target.value)}
                    />
                  </label>
                </Box>
              </Box>


              <Box textAlign={'left'} display={'flex'} >
                <Input 
                  type='checkbox'
                  isChecked={formData.textAlertsPayment}
                  onChange={(e) => handleInputChange('textAlertsPayment', e.target.checked)}
                />
                <Heading ml={2} >Receive text alerts about this trip (free of charge).</Heading>
              </Box>

            </Box>

            <Box bg={'white'} textAlign={'left'} p={4} >
              {/* <Image mb={1} width={'100%'} src='https://images.trvl-media.com/lodging/4000000/3450000/3447500/3447485/4c0514cb_l.jpg' />
              <Heading fontSize={'13px'} >8.8/10 Excellent (820 reviews)</Heading>
              <Heading fontSize={'13px'}>Guests rated this property 9/10 for cleanliness</Heading>
              <Heading fontSize={'13px'}>1 Room: Room, 2 Twin Beds, Non Smoking, City View</Heading> */}
              <Box justifyContent={'space-between'} display={'flex'} >
                <Box>1 room x 1 night</Box>
                <Box>$9,500.00</Box>
              </Box>

              <Box justifyContent={'space-between'} display={'flex'} >
                <Box>Taxes</Box>
                <Box>$1,710.00</Box>
              </Box>

              <Box justifyContent={'space-between'} display={'flex'} fontWeight={'bold'} >
                <Box>Total</Box>
                <Box>$11,210.00</Box>
              </Box>

              <Box justifyContent={'space-between'} display={'flex'} color='green.600' >
                <Box>Pay Now</Box>
                <Box>$0.00</Box>
              </Box>

              <Box justifyContent={'space-between'} display={'flex'} >
                <Box>Pay at property</Box>
                <Box>$11,210.00</Box>
              </Box>
              <Button 
                mt={4} 
                width={'100%'} 
                height='40px' 
                bg={'#FF9800'} 
                rounded={'7px'} 
                onClick={handleCompleteBooking}
                _hover={{ bg: '#F57C00' }}
              >
                Complete Booking
              </Button>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
  )
}

export default CheckoutPage
