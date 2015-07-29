//
//  FirstViewController.swift
//  Crowda
//
//  Created by Tyler Hall on 6/19/15.
//  Copyright (c) 2015 Tyler Hall. All rights reserved.
//

import UIKit
import Parse

class FirstViewController: UIViewController {

    @IBOutlet weak var label: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        let user = PFUser()
        user.username = "test"
        user.password = "blah"
        user.email = "test@test.com"
        
        user.signUpInBackgroundWithBlock { (success: Bool, error: NSError?) -> Void in
            if error == nil {
                self.label.text = user.username
            } else {
                // Examine the error object and inform the user.
            }
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

