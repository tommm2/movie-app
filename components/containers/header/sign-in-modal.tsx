import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

interface SignInDialogProps {
	onClickGoogleSignIn: () => {};
}

export default function SignInDialog({
	onClickGoogleSignIn,
}: SignInDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Sign in</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Sign In</DialogTitle>
					<DialogDescription>
						Enter your credentials below to login
					</DialogDescription>
				</DialogHeader>
				<div className='flex items-center space-x-2'>
					<Button
						className='w-full px-3'
						onClick={onClickGoogleSignIn}
					>
						Sign in with google
					</Button>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							type='button'
							variant='secondary'
						>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
