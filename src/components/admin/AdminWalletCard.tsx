
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card";
import { Wallet } from "lucide-react";

interface WalletData {
  walletId: string;
  balance: number;
  userType: string;
  userId: string;
}

interface AdminWalletCardProps {
  wallet?: WalletData | null;
}

export function AdminWalletCard({ wallet }: AdminWalletCardProps) {
  const balance = wallet?.balance ?? 0;
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(balance);

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Wallet Balance</CardTitle>
            <CardDescription className="text-primary-foreground/70">
              Your current balance
            </CardDescription>
          </div>
          <Wallet className="h-8 w-8 opacity-80" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium opacity-90">Total Balance</p>
            <p className="text-4xl font-bold">{formattedBalance}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}