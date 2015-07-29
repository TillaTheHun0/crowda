//
//  LoginViewController.swift
//  crowda
//
//  Created by Tyler Hall on 7/21/15.
//  Copyright (c) 2015 Tyler Hall. All rights reserved.
//

import Foundation
import UIKit
import Parse

class LoginViewController: UIViewController {
    
    @IBOutlet weak var userText: UITextField!
    @IBOutlet weak var pwText: UITextField!
    
    @IBAction func loginAction(sender: AnyObject) {
        let user = PFUser()
        user.username = userText.text
        user.password = pwText.text
        
    }
    override func viewDidLoad() {
       super.viewDidLoad()
        
    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
}
