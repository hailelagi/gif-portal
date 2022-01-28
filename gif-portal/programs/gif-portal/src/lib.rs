use anchor_lang::prelude::*;

declare_id!("7JrW5FLo4ATEqGKLD4cDYtSGSDsDcgUzUc7xGE4ka15s");

#[program]
pub mod gif_portal {
    use super::*;
    // tood:(research): (macros + context pattern in rust)
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        base_account.total_gifs = 0;
        Ok(())
    }

    pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let user = &mut ctx.accounts.user;

        let item = Item {
            gif_link: gif_link.to_string(),
            user_address: *user.to_account_info().key,
        };

        base_account.gifs.push(item);
        base_account.total_gifs += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct AddGif<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Item {
    pub gif_link: String,
    pub user_address: Pubkey
}

#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
    pub gifs: Vec<Item>
}
