'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Download, Home } from 'lucide-react'

const ReceiptPage = () => {
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState({
    orderId: '123456',
    orderDate: new Date().toLocaleDateString(),
    items: [
      { name: 'Base price', price: '120 APT' },
      { name: 'Textured finish', price: '1 APT' },
      { name: 'Soft polycarbonate material', price: '2 APT' },
    ],
    totalAmount: '123 APT',
    paymentStatus: 'Success',
  })

  const handleDownloadReceipt = () => {
    // Logic to download the receipt as PDF
    console.log('Downloading receipt...')
  }
async function checkPaymentStatus() {
    const response = await fetch(`https://nine-ad9w.onrender.com/request/one/${requestId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId: orderDetails.orderId }),
    })

    const data = await response.json()

    if (data.status === 'PAID') {
        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            paymentStatus: 'Success',
        }))
    } else {
        setTimeout(checkPaymentStatus, 60000) // Poll every 1 minute (60000 ms)
    }
}

useEffect(() => {
    checkPaymentStatus()
}, [])
  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-4xl font-bold mb-6 text-center'>Receipt</h1>
      <div className='bg-gray-50 p-6 rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold mb-4 text-green-600'>Thank You for Your Purchase!</h2>
        <p className='text-lg mb-6'>Your order has been processed successfully. Below are your order details:</p>

        <div className='mb-6'>
          <h3 className='text-xl font-medium mb-2'>Order Details</h3>
          <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
          <p><strong>Order Date:</strong> {orderDetails.orderDate}</p>
        </div>

        <div className='mb-6'>
          <h3 className='text-xl font-medium mb-2'>Items Ordered</h3>
          <ul className='list-disc pl-5'>
            {orderDetails.items.map((item, index) => (
              <li key={index} className='mb-2 flex justify-between'>
                <span>{item.name}</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
          <div className='my-2 h-px bg-gray-200' />
          <div className='flex justify-between font-semibold text-lg'>
            <span>Total Amount:</span>
            <span>{orderDetails.totalAmount}</span>
          </div>
        </div>

        <div className='mb-6'>
          <h3 className='text-xl font-medium mb-2'>Payment Status</h3>
          <p className='text-green-600'>{orderDetails.paymentStatus}</p>
        </div>

        <div className='flex justify-between'>
          <Button
            onClick={handleDownloadReceipt}
            className='px-6 py-3 bg-blue-600 text-white hover:bg-blue-700'>
            Download Receipt
            <Download className='h-4 w-4 ml-2 inline' />
          </Button>
          <Button
            onClick={handleGoHome}
            className='px-6 py-3 bg-gray-600 text-white hover:bg-gray-700'>
            Back to Home
            <Home className='h-4 w-4 ml-2 inline' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReceiptPage
