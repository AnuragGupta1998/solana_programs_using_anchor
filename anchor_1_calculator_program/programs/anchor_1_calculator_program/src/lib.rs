use anchor_lang::prelude::*;

declare_id!("4YtkEncmr4k5NBoq561ir1eXsrJENvWV33DKSxY2KnQj");

// data structure for the data account
#[account]
pub struct CalucatorAccountData{
    pub num:u64,
}

//account that must be provided when instruction invoked
#[derive(Accounts)]
pub struct Initialize<'info>{
    #[account(init, payer = signer, space = 8+8)]
    pub new_account: Account<'info, CalucatorAccountData>,

    #[account(mut)]
    pub signer:Signer<'info>,

    pub system_program:Program<'info, System>,
}

#[derive(Accounts)]
pub struct Double<'info>{
    #[account(mut)]
    pub account: Account<'info,CalucatorAccountData>,

    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Half<'info>{
    #[account(mut)]
    pub account: Account<'info,CalucatorAccountData>,

    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Add<'info>{
    #[account(mut)]
    pub account: Account<'info,CalucatorAccountData>,

    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Substract<'info>{
    #[account(mut)]
    pub account: Account<'info,CalucatorAccountData>,
    
    pub signer: Signer<'info>,
}

//the program macro that defines the modules and its instructions logics
//we can define multiple functions inside the program module and each function will be an instruction that can be invoked by the client
#[program]
pub mod anchor_1_calculator_program {
    use super::* ;

    pub fn initialize(ctx : Context<Initialize>) -> Result<()>{
        ctx.accounts.new_account.num = 1;
        Ok(())
    }

    pub fn double(ctx: Context<Double>) -> Result<()>{
        ctx.accounts.account.num = ctx.accounts.account.num*2;
        Ok(())
    }

    pub fn half(ctx: Context<Half>) -> Result<()>{
        ctx.accounts.account.num = ctx.accounts.account.num/2;
        Ok(())
    }

    pub fn add(ctx:Context<Add>,val:u64) ->Result<()>{
        ctx.accounts.account.num = ctx.accounts.account.num + val;
        Ok(())
    }

    pub fn substract(ctx:Context<Substract>,val:u64) ->Result<()>{
        ctx.accounts.account.num = ctx.accounts.account.num - val;
        Ok(())
    }
}