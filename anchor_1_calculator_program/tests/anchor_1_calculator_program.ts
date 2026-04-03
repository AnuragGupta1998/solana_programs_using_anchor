import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Anchor1CalculatorProgram } from "../target/types/anchor_1_calculator_program";
import { assert } from "chai";

describe("anchor_1_calculator_program", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.anchor1CalculatorProgram as Program<Anchor1CalculatorProgram>;
  const new_account = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    // Add your test here.
    // const tx = await program.methods.initialize().rpc();
    // console.log("Your transaction signature", tx);

    const t1 = await program.methods.initialize().
    accounts({
      newAccount:new_account.publicKey,
      signer:anchor.getProvider().wallet.publicKey
    }).
    signers([new_account]).
    rpc();
    console.log("Your transaction signature t1 ", t1);

    const acc = await program.account.calucatorAccountData.fetch(new_account.publicKey);
    console.log("The number is in t1 ",acc.num.toString());

    assert(acc.num.toNumber() == 1);
    assert.equal(acc.num.toNumber(), 1);
  });

  it("Double the Number",async () =>{
    //double the Number
    const t2 = await program.methods.double().accounts({
      account :new_account.publicKey,
      signer:anchor.getProvider().wallet.publicKey
    }).rpc();
    console.log("Your transaction signature t2 ", t2);

    //fetch the account data(num)
    const acc = await program.account.calucatorAccountData.fetch(new_account.publicKey);
    console.log("The number is in t2 ",acc.num.toString()); 

    assert.equal(acc.num.toString(),"2"); // 2*2 = 4
  });

  it("Double the Number",async () =>{
    //double the Number
    const t3 = await program.methods.double().accounts({
      account :new_account.publicKey,
      signer:anchor.getProvider().wallet.publicKey
    }).rpc();
    console.log("Your transaction signature t2 ", t3);

    //fetch the account data(num)
    const acc = await program.account.calucatorAccountData.fetch(new_account.publicKey);
    console.log("The number is in t3 ",acc.num.toString()); 

    assert.equal(acc.num.toString(),"4"); // 2*2 = 4
  })
});
