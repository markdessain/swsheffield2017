import os
from flask import Flask, render_template, request
import stripe

stripe_keys = {
  'secret_key': os.environ['SECRET_KEY'],
  'publishable_key': os.environ['PUBLISHABLE_KEY']
}

stripe.api_key = stripe_keys['secret_key']

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html', mode=os.environ['MODE'])


@app.route('/charge', methods=['POST'])
def charge():
    customer = stripe.Customer.create(
        email=request.form['stripeEmail'],
        source=request.form['stripeToken']
    )

    charge = stripe.Charge.create(
        customer=customer.id,
        amount=request.form['amount'],
        currency='gbp',
        description='Flask Charge'
    )

    return render_template('charge.html', amount=int(int(request.form['amount'])/100))


@app.route('/charge_demo', methods=['get'])
def charge_demo():
    return render_template('charge.html', amount=10)


@app.route('/next', methods=['GET'])
def next():
    return render_template('next.html', amount=10)


@app.route('/report', methods=['GET'])
def report():
    return render_template('report.html')


if __name__ == '__main__':
    app.run(debug=True)
