//
//  FirstViewController.swift
//  Crowda
//
//  Created by Tyler Hall on 6/19/15.
//  Copyright (c) 2015 Tyler Hall. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController {
    
    var count = 0
    
    @IBOutlet weak var countLabel: UILabel!
   
    @IBAction func incrementCount(sender: AnyObject) {
        count++
        countLabel.text = String(count)
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        countLabel.text = String(count)
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

