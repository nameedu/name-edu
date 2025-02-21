import { CreditCard, Calendar, Receipt, AlertCircle, CheckCircle, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const FeePayment = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Fee Payment</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Make payments and view your payment history
          </p>

          <div className="max-w-4xl mx-auto">
            {/* Current Fee Status */}
            <Card className="p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Current Fee Status</h2>
                  <p className="text-neutral-600">Academic Year 2023-24</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="text-2xl font-bold text-primary">₹45,000</div>
                  <p className="text-sm text-neutral-500">Due by April 15, 2024</p>
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full md:w-auto">Pay Now</Button>
              </div>
            </Card>

            {/* Payment History */}
            <h2 className="text-2xl font-semibold mb-6">Payment History</h2>
            <div className="space-y-4">
              {paymentHistory.map((payment, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Receipt className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{payment.description}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="w-4 h-4 text-neutral-500" />
                          <span className="text-sm text-neutral-500">{payment.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 flex items-center justify-between md:space-x-8">
                      <div>
                        <div className="font-semibold">₹{payment.amount}</div>
                        <div className="flex items-center mt-1">
                          {payment.status === "Paid" ? (
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
                          )}
                          <span className={`text-sm ${
                            payment.status === "Paid" ? "text-green-500" : "text-yellow-500"
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                      </div>

                      {payment.status === "Paid" && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const paymentHistory = [
  {
    description: "First Term Fee",
    date: "October 15, 2023",
    amount: "45,000",
    status: "Paid",
  },
  {
    description: "Second Term Fee",
    date: "January 15, 2024",
    amount: "45,000",
    status: "Paid",
  },
  {
    description: "Third Term Fee",
    date: "April 15, 2024",
    amount: "45,000",
    status: "Pending",
  },
];

export default FeePayment;
