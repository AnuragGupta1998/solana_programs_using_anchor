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

    const acc = await program.account.calculatorAccountData.fetch(new_account.publicKey);
    
    console.log("The number is in t1 ",acc.num.toString());

    assert(acc.num.toNumber() == 1);
    assert.equal(acc.num.toNumber(), 1);
  });

  it("Double the Number",async () => {
    //double the Number
    const t2 = await program.methods.double().accounts({
      account :new_account.publicKey,
      signer:anchor.getProvider().wallet.publicKey
    }).rpc();
    console.log("Your transaction signature t2 ", t2);

    //fetch the account data(num)
    const acc = await program.account.calculatorAccountData.fetch(new_account.publicKey);
    console.log("The number is in t2 ",acc.num.toString()); 

    assert.equal(acc.num.toString(),"2"); // 2*2 = 4
    assert(acc.num.toString() =="2");
  });

  it("Double the Number",async () =>{
    //double the Number
    const t3 = await program.methods.double().accounts({
      account :new_account.publicKey,
      signer:anchor.getProvider().wallet.publicKey
    }).rpc();
    console.log("Your transaction signature t2 ", t3); //1*2=2 now num =2

    //fetch the account data(num)
    const acc = await program.account.calculatorAccountData.fetch(new_account.publicKey);
    console.log("The number is in t3 ",acc.num.toString()); 

    assert.equal(acc.num.toString(),"4"); // 2*2 = 4 now  num =4
  });
  
  it("add the number", async () =>{
    const t4 = await program.methods.add(new anchor.BN(2)).accounts({
      account :new_account.publicKey,
      signer:anchor.getProvider().wallet.publicKey
    }).rpc();
    console.log("Your transaction signature t4 ", t4);
    
    //fetch the account data(num)
    const acc = await program.account.calculatorAccountData.fetch(new_account.publicKey);
    console.log("The number is in t4 ",acc.num.toString());
    
    assert.equal(acc.num.toString(),"6"); // 4+2 = 6 now num =6
  });
  
  it("half the number", async () => {
    const t5 = await program.methods.half().accounts({
      account :new_account.publicKey,
      signer:anchor.getProvider().wallet.publicKey,
    }).rpc();
    console.log("transaction signature t5", t5);

    const acc = await program.account.calculatorAccountData.fetch(new_account.publicKey);
    console.log("The number is in t5 ",acc.num.toString());

    assert.equal(acc.num.toString(),"3"); // 6/2 = 3 now num =3   
  
   })
  


});
