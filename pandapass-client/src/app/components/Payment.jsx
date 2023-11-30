import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function Payment() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Button onClick={handleOpen} variant="gradient">
                Transaction
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <div className="relative flex flex-col bg-white shadow-lg rounded-xl pointer-events-auto dark:bg-gray-800">
                    <DialogHeader>
                        <figure className="absolute inset-x-0 top-0 -mt-20">
                            {/* <img
                                src="https://via.placeholder.com/200x200"
                                alt="Preline Logo"
                                className="w-full h-auto object-fit rounded-t-xl"
                            /> */}
                        </figure>
                    </DialogHeader>
                    <DialogBody>
                        <div className="p-4 sm:p-7 overflow-y-auto">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    Transaction
                                </h3>
                                <p className="text-sm text-gray-500">T-id #3682303</p>
                            </div>

                            <div className="mt-5 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-5">
                                <div>
                                    <span className="block text-xs uppercase text-gray-500">
                                        Pay Amount
                                    </span>
                                    <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                                        $316.8
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase text-gray-500">
                                        Date paid:
                                    </span>
                                    <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                                        April 22, 2020
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase text-gray-500">
                                        Payment method:
                                    </span>
                                    <div className="flex items-center gap-x-2">
                                        <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                                            Visa
                                        </span>
                                        <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                                            •••• 4242
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-10">
                                <h4 className="text-xs font-semibold uppercase text-gray-800 dark:text-gray-200">
                                    Summary
                                </h4>
                                <ul className="mt-3 flex flex-col">
                                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                                        <div className="flex items-center justify-between w-full">
                                            <span>Payment to Front</span>
                                            <span>$264.00</span>
                                        </div>
                                    </li>
                                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                                        <div className="flex items-center justify-between w-full">
                                            <span>Tax fee</span>
                                            <span>$52.8</span>
                                        </div>

                                    </li>

                                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-800 dark:border-gray-700 dark:text-gray-200">

                                        <div className="flex items-center justify-between w-full">

                                            <span>Amount paid</span>

                                            <span>$316.8</span>

                                        </div>

                                    </li>

                                </ul>

                            </div>

                            <div className="mt-5 flex justify-end gap-x-2">

                                <a className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">

                                    Go Back

                                </a>

                                <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">

                                    Pay

                                </a>

                            </div>

                            <div className="mt-5 sm:mt-10">

                                <p className="text-sm text-gray-500">If you have any questions, please contact us at <a className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium" href="#">example@site.com</a> or call at <a className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium" href="tel:+1898345492">+1 898-34-5492</a></p>

                            </div>

                        </div>
                    </DialogBody>
                </div>
            </Dialog>
        </>
    );
}
