"use client";

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

export function InputDemo() {
  return <Input type="email" placeholder="Email" />
}

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [previousStep, setPreviousStep] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Reset flow to start at step 1 when opening the dialog
  const openDialog = () => {
    setCurrentStep(1); // Reset to step 1
    setShowDialog(true);
  };

  const handleNextStep = () => setCurrentStep(currentStep + 1);
  const handlePreviousStep = () => setCurrentStep(currentStep - 1);

  // Handle cross button or cancel button click
  const handleCancel = () => {
    setPreviousStep(currentStep); // Save the current step
    setShowCancelDialog(true); // Show cancellation confirmation
  };

  // Undo cancel and go back to the step before cancel action
  const handleUndoCancel = () => {
    setShowCancelDialog(false);
  };

  // Confirm cancellation and close dialog
  const handleConfirmCancel = () => {
    setShowCancelDialog(false);
    setShowDialog(false); // Close dialog
    setCurrentStep(1); // Reset step to 1
  };

  // Handle when the dialog's `onOpenChange` is triggered (such as when clicking the cross)
  const handleDialogCloseRequest = (isOpen) => {
    if (!isOpen) {
      handleCancel(); // Show confirmation dialog
    } else {
      setShowDialog(true);
    }
  };

  // Define the title based on the current step
  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "New CNAME Registry";
      case 2:
        return "Add subdomain on Meta";
      case 3:
        return "Verify subdomain on Meta";
      case 4:
        return "Create a CNAME record";
      case 5:
        return "New CNAME registry";
      case 6:
        return "";
      default:
        return "New CNAME Registry";
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <Tabs defaultValue="cname" className="fit">
          <TabsList>
            <TabsTrigger value="linkedAccounts">Linked Accounts</TabsTrigger>
            <TabsTrigger value="cname">CNAME</TabsTrigger>
            <TabsTrigger value="yourAccount">Your Account</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
          </TabsList>
          <TabsContent value="cname">
            Connect your domains.
            <div></div>
            <Dialog open={showDialog} onOpenChange={handleDialogCloseRequest}>
              <DialogTrigger asChild>
                <Button onClick={openDialog}>Add CNAME</Button>
              </DialogTrigger>
              <DialogContent>
                {showCancelDialog ? (
                  <div>
                    <DialogHeader>
                      <DialogTitle>Cancel new CNAME registry</DialogTitle>
                      <div className='pt-[14px]'>
                        <DialogDescription className='font-normal'>
                          Are you sure you want to cancel the new CNAME registry?
                        
                        </DialogDescription>
                        </div>
                    </DialogHeader>

                    <div className="flex justify-end space-x-1 pt-[20px]">
                      <Button variant="outline" onClick={handleUndoCancel}>
                        Undo
                      </Button>
                      <Button variant="destructive" onClick={handleConfirmCancel}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle>{getStepTitle()}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      {currentStep === 1 && (
                        <div className="pt-[15px]">
                          <p>Before you can benefit from Pixamp Attribution, we will help you complete the <b>3 steps</b> below:</p>
                          <br />
                            <li type="1">Add a subdomain on Meta</li>
                            <li type="1">Verify the new subdomain on Meta</li>
                            <li type="1" className='mb-[0px]'>Register app.pixamp.xyz as a CNAME</li>
                          <br />
                          <p>This set-up is <b>necessary</b> for effective tracking.</p>
                          <div className="flex justify-end space-x-1 pt-[20px]">
                            <Button variant="outline" onClick={handleCancel}>
                              Cancel
                            </Button>
                            <Button onClick={handleNextStep}>Let's Start</Button>
                          </div>
                        </div>
                      )}
                      {currentStep === 2 && (
                        <div>
                          <p className='text-[#7E828A] font-medium pt-[4px] pb-[20px]'>Step 1/3</p>
                          <p>Add to Meta the custom subdomain you want to show in your campaigns.</p>
                          <br />
                          <p>Here's how to proceed:</p>
                          <br />
                          <li type="1">
                            Go to your Meta Business Manager:
                            <br />
                            <a 
                            href="https://business.facebook.com/settings/owned-domains" target="_blank" rel="noopener noreferrer" className='underline text-[#2662FE]'>
                              https://business.facebook.com/settings/owned-domains
                            </a>
                          </li>
                            <li type="1">Select the right Business Account</li>
                            <li type="1">Click on the button "<b>ADD</b>"</li>
                            <li type="1" className='mb-[0px]'>Enter the domain you want to use (e.g. <b>social.pixamp.xyz</b>)</li>
                          <br />
                          <p className='pb-[6px]'><b>Resources to help you:</b></p>
                          <li className='mb-[0px]'>
                              <a 
                              href="https://developers.facebook.com/docs/sharing/domain-verification/verifying-your-domain/" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className='underline text-[#2662FE] inline-flex items-center gap-1'
                            >
                              View the full Meta documentation
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2662FE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <g fill="none" fill-rule="evenodd">
                                  <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/>
                                </g>
                              </svg>
                            </a>
                            </li>
                            <li className='mb-[0px]'>
                              <a 
                                href="https://www.youtube.com/watch?v=LsxgAOL2vSY" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className='underline text-[#2662FE] inline-flex items-center gap-1'
                              >
                                Watch tutorial on YouTube
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2662FE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <g fill="none" fill-rule="evenodd">
                                    <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/>
                                  </g>
                                </svg>
                              </a>
                            </li>
                          <div className="flex justify-end space-x-1 pt-[15px]">
                            <Button variant="outline" onClick={handlePreviousStep}>
                              Previous
                            </Button>
                            <Button onClick={handleNextStep}>Next Step</Button>
                          </div>
                        </div>
                      )}
                      {currentStep === 3 && (
                        <div>
                          <p className='text-[#7E828A] font-medium pt-[4px] pb-[20px]'>Step 2/3</p>
                        
                          <p>Confirm your business’s authenticity by verifying the subdomain on Meta Business:</p>
                          <br />
                          <li type="1">
                            Verify your domain with the <b>DNS Verification:</b>
                              <li type="a" className='pl-[20px] pt-[12px]'>Navigate to the <strong>DNS record section</strong> of your domain host</li>
                              <li type="a" className='pl-[20px]'>Add a new <strong>TXT</strong> entry to your DNS record</li>
                              <li type="a" className='pl-[20px]'>Paste the <strong>TXT record</strong> from Meta on data</li>
                              <li type="a" className='pl-[20px]'>Add <strong>@</strong> to the <strong>Host</strong> field (if required by your domain host)</li>
                          </li>
                          <li type="1" className='mb-[0px]'>
                            Go back to your Business Manager and click <strong>"Verify"</strong>
                          </li>

                          <br />
                          <p className='pb-[6px]'><b>Resources to help you:</b></p>
                            <li className='mb-[0px]'>
                              <a 
                              href="https://developers.facebook.com/docs/sharing/domain-verification/verifying-your-domain/" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className='underline text-[#2662FE] inline-flex items-center gap-1'
                            >
                              View the full Meta documentation
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2662FE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <g fill="none" fill-rule="evenodd">
                                  <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/>
                                </g>
                              </svg>
                            </a>
                            </li>
                            <li className='mb-[0px]'>
                              <a 
                                href="https://www.youtube.com/watch?v=LsxgAOL2vSY" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className='underline text-[#2662FE] inline-flex items-center gap-1'
                              >
                                Watch tutorial on YouTube
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2662FE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <g fill="none" fill-rule="evenodd">
                                    <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/>
                                  </g>
                                </svg>
                              </a>
                            </li>

                          <div className="flex justify-end space-x-1 pt-[15px]">
                            <Button variant="outline" onClick={handlePreviousStep}>
                              Previous
                            </Button>
                            <Button onClick={handleNextStep}>Next Step</Button>
                          </div>
                        </div>
                      )}
                      {currentStep === 4 && (
                        <div>
                        <p className='text-[#7E828A] font-medium pt-[4px] pb-[20px]'>Step 3/3</p>
                      
                        <p>You now have to create a CNAME record with app.pixamp.xyz as destination for the subdomain you verified:</p>

                        <br />

                        <li type='1'>Navigate to the <b>DNS record section</b> of your domain host</li>
                        <li type='1'><b>Add New Record</b> and select <b>CNAME</b> as Type</li>
                        <li type='1'>
                          Follow this set-up:
                          <li type='a' className='mb-[2px] mt-[8px] pl-[20px] text-[16px]'><b>Name/Host/Alias:</b> subdomain <br />(for <b>social.pixamp.xyz</b> the subdomain is <b><u>social</u></b>)</li>
                          <li type='a' className='mb-[2px] pl-[20px] text-[16px]'><b>TTL</b> (if required): 3600</li>
                          <li type='a' className='mb-[2px] pl-[20px] text-[16px]'><b>Record Type</b>: CNAME</li>
                          <li type='a' className='pl-[20px] text-[16px]'><b>Value/Answer/Destination:</b> app.pixamp.xyz</li>
                        </li>
                        <li type='1' className='mb-[0px]'><b>Save</b> the new CNAME record</li>

                        <br />
                        <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                          width="14"
                          height="14" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="#7E828A" 
                          stroke-width="2" 
                          stroke-linecap="round" 
                          stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                          <span className='text-[#7E828A] text-[12px]'>The CNAME registration process may vary depending on your domain host.</span>
                        </div>

                        <p className='pb-[6px] pt-[12px]'><b>Resources to help you:</b></p>
                        <li className='mb-[0px]'>
                          <a 
                            href="https://developers.facebook.com/micro_site/url/?click_from_context_menu=true&country=FR&destination=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fsharing%2Fdomain-verification%2Fverifying-your-domain%2F%23dns-txt&event_type=click&last_nav_impression_id=27Ax9hwmhe47vzO7z&max_percent_page_viewed=100&max_viewport_height_px=778&max_viewport_width_px=1440&orig_http_referrer=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fsharing%2Fdomain-verification%2Fverifying-your-domain%2F&orig_request_uri=https%3A%2F%2Fdevelopers.facebook.com%2Fajax%2Fdocs%2Fnav%2F%3Fpath1%3Dsharing%26path2%3Ddomain-verification%26path3%3Dverifying-your-domain&region=emea&scrolled=true&session_id=1Gr6LUZCTnk4VwRYr&site=developers" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className='underline text-[#2662FE] inline-flex items-center gap-1'
                          >
                            Meta's documentation on DNS Verification
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2662FE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <g fill="none" fill-rule="evenodd">
                                <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/>
                              </g>
                            </svg>
                          </a>
                        </li>


                        <div className="flex justify-end space-x-1 pt-[15px]">
                          <Button variant="outline" onClick={handlePreviousStep}>
                            Previous
                          </Button>
                          <Button onClick={handleNextStep}>Next Step</Button>
                        </div>
                      </div>
                      )}
                      {currentStep === 5 && (
                        <div className='mt-[20px]'>
                          <p className='mb-[10px]'>Enter your verified domain:</p>

                          <Input
                            placeholder="subdomain.domain.com"
                          />
                          
                          <div className="flex justify-end space-x-1 pt-[20px]">
                            <Button variant="outline" onClick={handlePreviousStep}>
                              Previous
                            </Button>
                            <Button onClick={handleNextStep}>Finish</Button>
                          </div>
                        </div>
                      )}
                      {currentStep === 6 && (
                        <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mt-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#359742" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-2">Congrats!</h2>
                        
                        <p className="text-gray-600 mb-6">Your CNAME has been registered on Pixamp with success!</p>
                        
                        <div className="flex justify-end w-full">
                          <Button onClick={() => setShowDialog(false)}>Close</Button>
                        </div>
                      </div>
                      
                      )}

                    </DialogDescription>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>
          <TabsContent value="linkedAccounts">Link all your accounts here.</TabsContent>
          <TabsContent value="yourAccount">Manage your account.</TabsContent>
          <TabsContent value="organization">Manage your organization.</TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
