'use strict';

const Paystack = use('App/Services/PaystackService');
const Transaction = use('App/Models/Transaction');
const EventInfo = use('App/Utilities/EventInfo');
const { nairaToKobo, koboToNaira } = use('App/Helpers/Money');

class PaymentController {
  async purchaseTable({ request, response, auth }) {
    let { paystack_ref, amount } = request.only(['paystack_ref', 'amount']);

    try {
      const transaction = await Paystack.verifyTransactionAmount(paystack_ref, nairaToKobo(amount));
      const totalTable = Math.floor(transaction.amount / nairaToKobo(await EventInfo.unitPrice()));

      if (totalTable < 1) {
        const reason = 'Amount paid is less than price of 1 table unit.';
        await PaystackService.refundPayment({ reference: paystack_ref, amount: transaction.amount, reason });
        return response.status(200).json({ message: reason });
      }

      await Transaction.create({ user_id: auth.user.id, paystack_ref, amount: koboToNaira(transaction.amount), total_table: totalTable });
      return response.status(200).json({ message: 'Transaction successfull.' });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') return response.status(200).json({ message: 'Invalid Payment.' });
      if (err.name === 'InternalServerError') throw err;
      return response.status(200).json({ message: err.message });
    }
  }
}

module.exports = PaymentController;
