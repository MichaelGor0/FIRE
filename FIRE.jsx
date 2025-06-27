import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RetirementCalculator() {
  const [age, setAge] = useState(29);
  const [currentSavings, setCurrentSavings] = useState(2500000);
  const [monthlySaving, setMonthlySaving] = useState(20000);
  const [monthlySpending, setMonthlySpending] = useState(30000);
  const [withdrawRate, setWithdrawRate] = useState(4.2);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const annualSpending = monthlySpending * 12;
    const targetPortfolio = annualSpending / (withdrawRate / 100);
    let portfolio = currentSavings;
    let years = 0;

    while (portfolio < targetPortfolio) {
      portfolio += monthlySaving * 12;
      portfolio *= 1 + expectedReturn / 100;
      years++;
    }

    setResult({
      targetPortfolio: targetPortfolio.toFixed(2),
      yearsToRetire: years,
      retirementAge: age + years,
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card>
        <CardContent className="grid gap-4 p-4">
          <h2 className="text-xl font-bold">Retirement Calculator</h2>

          <Input
            type="number"
            value={age}
            onChange={(e) => setAge(+e.target.value)}
            placeholder="Current Age"
          />
          <Input
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(+e.target.value)}
            placeholder="Current Savings ($)"
          />
          <Input
            type="number"
            value={monthlySaving}
            onChange={(e) => setMonthlySaving(+e.target.value)}
            placeholder="Monthly Saving ($)"
          />
          <Input
            type="number"
            value={monthlySpending}
            onChange={(e) => setMonthlySpending(+e.target.value)}
            placeholder="Expected Monthly Spending in Retirement ($)"
          />
          <Input
            type="number"
            step="0.1"
            value={withdrawRate}
            onChange={(e) => setWithdrawRate(+e.target.value)}
            placeholder="Withdrawal Rate (%)"
          />
          <Input
            type="number"
            step="0.1"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(+e.target.value)}
            placeholder="Expected Annual Return (%)"
          />

          <Button onClick={calculate}>Calculate</Button>

          {result && (
            <div className="mt-4 text-sm">
              <p><strong>Target Portfolio:</strong> ${result.targetPortfolio}</p>
              <p><strong>Years to Retire:</strong> {result.yearsToRetire}</p>
              <p><strong>Estimated Retirement Age:</strong> {result.retirementAge}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
