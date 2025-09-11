import { DollarSign, IndianRupee, Ticket, User, Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Checkbox } from "@radix-ui/react-checkbox"
import { Button } from "@/components/pages/ui/button"
import { useState } from "react"

interface PricingTicketsSectionProps {
  formik: any
}

interface TicketRow {
  ticketType: string
  pricePerTicket: number
  totalTickets: number
  maxTicketsPerUser: number
}

export function PricingTicketsSection({ formik }: PricingTicketsSectionProps) {
  const [isRowBasedTickets, setIsRowBasedTickets] = useState(false)
 const [ticketRows, setTicketRows] = useState<TicketRow[]>(formik.values.tickets || []);


const addTicketRow = () => {
  setTicketRows([
    ...ticketRows,
    { ticketType: "", pricePerTicket: 0, totalTickets: 0, maxTicketsPerUser: 1 },
  ]);
};

  const removeTicketRow = (index: number) => {
    if (ticketRows.length > 1) {
      setTicketRows(ticketRows.filter((_, i) => i !== index))
      formik.setFieldValue("tickets", ticketRows.filter((_, i) => i !== index))
    }
  }

  const updateTicketRow = (index: number, field: keyof TicketRow, value: string | number) => {
    const updatedRows = ticketRows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    setTicketRows(updatedRows)
    formik.setFieldValue("tickets", updatedRows)
  }

 const toggleTicketMode = (checked: boolean) => {
  setIsRowBasedTickets(checked);
  if (checked) {
    formik.setFieldValue("tickets", ticketRows.length ? ticketRows : []); 
    formik.setFieldValue("pricePerTicket", undefined);
    formik.setFieldValue("totalTicket", undefined);
    formik.setFieldValue("maxTicketPerUser", undefined);
  } else {
    formik.setFieldValue("tickets", []);
    formik.setFieldValue("pricePerTicket", "");
    formik.setFieldValue("totalTicket", "");
    formik.setFieldValue("maxTicketPerUser", 0);
  }
};


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Pricing & Tickets
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Checkbox id="rowBasedTickets" checked={isRowBasedTickets} onCheckedChange={toggleTicketMode} />
          <Label htmlFor="rowBasedTickets" className="text-sm font-normal">
            Use row-based ticket types
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        {!isRowBasedTickets ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pricePerTicket">Price per Ticket *</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="pricePerTicket"
                  type="number"
                  placeholder="0.00"
                  className="pl-10"
                  {...formik.getFieldProps("pricePerTicket")}
                />
                {formik.touched.pricePerTicket && formik.errors.pricePerTicket && (
                  <p className="text-sm text-red-500">{formik.errors.pricePerTicket}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalTicket">Total Tickets *</Label>
              <div className="relative">
                <Ticket className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="totalTicket"
                  type="number"
                  placeholder="100"
                  className="pl-10"
                  {...formik.getFieldProps("totalTicket")}
                />
                {formik.touched.totalTicket && formik.errors.totalTicket && (
                  <p className="text-sm text-red-500">{formik.errors.totalTicket}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxTicketPerUser">Ticket Limit per User</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="maxTicketPerUser"
                  type="number"
                  placeholder="5"
                  className="pl-10"
                  {...formik.getFieldProps("maxTicketPerUser")}
                />
                {formik.touched.maxTicketPerUser && formik.errors.maxTicketPerUser && (
                  <p className="text-sm text-red-500">{formik.errors.maxTicketPerUser}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground mb-2">
              <div className="col-span-3">Ticket Type *</div>
              <div className="col-span-2">Price *</div>
              <div className="col-span-3">Total Tickets *</div>
              <div className="col-span-3">Max per User *</div>
              <div className="col-span-1">Action</div>
            </div>

            {ticketRows.map((row, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-3">
                  <Input
                    placeholder="e.g., VIP, General"
                    value={row.ticketType}
                    onChange={(e) => updateTicketRow(index, "ticketType", e.target.value)}
                  />
                  {formik.touched.tickets?.[index]?.ticketType && formik.errors.tickets?.[index]?.ticketType && (
                    <p className="text-sm text-red-500">{formik.errors.tickets[index].ticketType}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      value={row.pricePerTicket}
                      onChange={(e) => updateTicketRow(index, "pricePerTicket", Number.parseFloat(e.target.value) || 0)}
                    />
                    {formik.touched.tickets?.[index]?.price && formik.errors.tickets?.[index]?.pricePerTicket && (
                      <p className="text-sm text-red-500">{formik.errors.tickets[index].pricePerTicket}</p>
                    )}
                  </div>
                </div>

                <div className="col-span-3">
                  <div className="relative">
                    <Ticket className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="100"
                      className="pl-10"
                      value={row.totalTickets}
                      onChange={(e) => updateTicketRow(index, "totalTickets", Number.parseInt(e.target.value) || 0)}
                    />
                    {formik.touched.tickets?.[index]?.totalTickets && formik.errors.tickets?.[index]?.totalTickets && (
                      <p className="text-sm text-red-500">{formik.errors.tickets[index].totalTickets}</p>
                    )}
                  </div>
                </div>

                <div className="col-span-3">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="5"
                      className="pl-10"
                      value={row.maxTicketsPerUser}
                      onChange={(e) =>
                        updateTicketRow(index, "maxTicketsPerUser", Number.parseInt(e.target.value) || 1)
                      }
                    />
                    {formik.touched.tickets?.[index]?.maxTicketsPerUser &&
                      formik.errors.tickets?.[index]?.maxTicketsPerUser && (
                        <p className="text-sm text-red-500">{formik.errors.tickets[index].maxTicketsPerUser}</p>
                      )}
                  </div>
                </div>

                <div className="col-span-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeTicketRow(index)}
                    disabled={ticketRows.length === 1}
                    className="h-10 w-10 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {formik.touched.tickets && formik.errors.tickets && typeof formik.errors.tickets === "string" && (
              <p className="text-sm text-red-500">{formik.errors.tickets}</p>
            )}

            <Button type="button" variant="outline" onClick={addTicketRow} className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Ticket Type
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}