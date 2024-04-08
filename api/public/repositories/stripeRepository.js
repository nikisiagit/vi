const baseUrl = '/stripe'

export const stripeRepository = (client) => ({

  async postPaymentIntent(items) {
    const { clientSecret } = await client.$post(baseUrl + `/payment-intent`, {items});
    return clientSecret;
  }

});
