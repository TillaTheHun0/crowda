//
//  SignupController.swift
//  crowda
//
//  Created by Tyler Hall on 7/21/15.
//  Copyright (c) 2015 Tyler Hall. All rights reserved.
//

import Foundation
import UIKit
import Parse

class SignupController: UIViewController {
    
    @IBOutlet weak var userField: UITextField!
    @IBOutlet weak var pwField: UITextField!
    @IBOutlet weak var emailField: UITextField!
    
    @IBAction func signupAction(sender: AnyObject) {//button for signup
        let user = PFUser()
        user.username = self.userField.text
        user.password = self.pwField.text
        user.email = self.emailField.text
        
        user.signUpInBackgroundWithBlock { (success: Bool, error:NSError? ) -> Void in
            if error == nil {
                //send user to homepage
                self.performSegueWithIdentifier(identifier: "FirstView", sender: self)
            }
            else{
                //display bug
            }
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
}