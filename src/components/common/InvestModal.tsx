import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'

interface InvestModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function InvestModal({ isOpen, setIsOpen }: InvestModalProps) {
  const { data: session } = useSession();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!session?.user?.email) return;
    
    try {
      const response = await fetch('/api/notify-invest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
          name: session.user.name || 'Anonymous',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setIsOpen(false);
          setSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gradient-to-br from-yellow-300/80 to-yellow-500/80 backdrop-blur-xl px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-gray-900">
                      {submitted ? 'Thank You!' : 'Interested in Aiko?'}
                    </Dialog.Title>
                    <div className="mt-4">
                      <p className="text-lg text-gray-900">
                        {submitted 
                          ? "We'll be in touch soon!"
                          : "We'll add you to our investor list and contact you with next steps."}
                      </p>
                    </div>
                  </div>
                </div>
                {!submitted && (
                  <div className="mt-6 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-white/90 hover:bg-white/100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 transition-all duration-200"
                      onClick={handleSubmit}
                    >
                      Confirm Interest
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
