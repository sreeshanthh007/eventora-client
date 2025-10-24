import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/pages/ui/dialog";

import { Button } from "../pages/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/pages/ui/input-otp";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { UseTimer } from "@/hooks/common/UseTimer";
interface OTPModalProps{
    isOpen:boolean,
    onClose:()=>void,
    onVerify:(otp:string) =>void,
    onResend:()=>void,
    isSending:boolean
}



const OTPModal : React.FC<OTPModalProps> = ({
    isOpen,
    onClose,
    onVerify, 
    onResend,
    isSending
}) =>{
    const [otp,setOtp] = useState("")
    const {timeLeft,startTimer,resetTimer} = UseTimer(60)

    useEffect(()=>{
        if(isOpen && !isSending){
            setOtp("")
            resetTimer();
            startTimer()
        }
    },[isOpen,startTimer,resetTimer,isSending]);

    const handleVerify = ()=>{
        onVerify(otp)
    }

    
    const handleResend = ()=>{
        setOtp("")
        onResend()
    }
      return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter OTP</DialogTitle>
          <DialogDescription>
            Please enter the 6-digit code sent to your device.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isSending ? (
            <div className="flex justify-center items-center">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Sending OTP...</span>
            </div>
          ) : (
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          )}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Time remaining: {timeLeft} seconds
            </p>
          </div>
          <Button
            onClick={handleVerify}
            className="w-full"
            disabled={otp.length !== 6}
          >
            Verify OTP
          </Button>
          {!isSending && timeLeft === 0 && (
            <Button variant="outline" onClick={handleResend} className="w-full">
              Resend OTP
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OTPModal