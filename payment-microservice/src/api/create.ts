import { HttpStatus } from '@helpers/errorHandler'
import { CustomReq } from '@helpers/requestHandler'
import { Response, RequestHandler, NextFunction } from 'express'
import Stripe from 'stripe'

const stripe = new Stripe(
  'sk_test_51PDQlFJwc1F7FQXgVdPVUcvTLZTaNxiYl34Iy1hilEdjKoNvxCMmr2AZGVjgyYg7QuHLG3XM8YxGSoBW9lTvfaP700mGm9MCKY'
)

const createPayment: RequestHandler = async (
  req: CustomReq<any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data } = req.body

    const items = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: data?.title,
            images: [data?.image]
          },
          unit_amount: Math.round(data?.price ?? 1 * 100)
        },
        quantity: 1
      }
    ]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: `http://localhost:5173/payment/status?user=${req.user}&course=${data?._id}`,
      cancel_url: 'http://localhost:5173/payment/status'
    })

    res.status(HttpStatus.OK).json({ id: session.id })
  } catch (e: any) {
    next(e)
  }
}
export default createPayment
